"use client";

import { useCallback, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, Box } from "@mui/material";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import DesignTabPanel from "@/components/upload/tab-design";
import VideoPlayer from "@/components/upload/video-player";
import TranscriptionTabPanel from "@/components/upload/tab-transcription";
import { compileVTT, parseVtt } from "@/utils";
import { FileService } from "@/service/file-service";
import { useAuth } from "@/hooks/use-auth";

import {
  fontWeights,
  MIN_FONT,
  MAX_FONT,
  MIN_POSITION,
  MAX_POSITION,
} from "@/constants";
import { useMounted } from "@/hooks/use-mounted";
import ProgressBar from "@/components/common/progress-bar";
import { gtm } from "@/utils/gtm";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const tabStyle = {
  mb: 1,
  borderRadius: 8,
  "&.Mui-selected": {
    backgroundColor: "background.paper",
    boxShadow: 2,
  },
};

const client = new FileService();

export default function UploadPage({ params }) {
  const {
    setTitleInfo,
    setHandleSave,
    setHandleExport,
    loading,
    setLoading,
    progress,
  } = useAuth();
  const isMounted = useMounted();

  const [value, setValue] = useState(0);
  const [metadata, setMetadata] = useState({});
  const [cues, setCues] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [showInputs, setShowInputs] = useState({});
  const [selectedCue, setSelectedCue] = useState({});
  const [startPos, setStartPos] = useState(0);
  const [updatedCues, setUpdatedCues] = useState([]);
  const [data, setData] = useState({});
  const [canShow, setCanShow] = useState();

  const handleSave = async () => {
    try {
      await formik.submitForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      await client.download({ fileId: params.id });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getData = useCallback(async () => {
    try {
      const { data } = await client.get(params.id);
      setTitleInfo({ title: data.fileName });
      setData(data);
    } catch (error) {
      toast.error(error.message);
    }
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    setHandleSave(handleSave);
    setHandleExport(handleExport);
    getData();
    return () => {
      setHandleSave(null);
      setHandleExport(null);
    };
  }, []);

  useEffect(() => {
    if (!data?.vtt) return;
    const parsed = parseVtt(data.vtt);
    const obj = {};
    const bools = {};
    if (parsed.valid) {
      setCues(parsed.cues);
      if (parsed.cues.length > 0) setSelectedCue(parsed.cues[0]);
      Array.from(parsed.cues).forEach((cue) => {
        obj[cue.identifier] = cue.text;
        bools[cue.identifier] = false;
      });
    }
    setInitialValues(obj);
    setShowInputs(bools);
    setTimeout(() => setCanShow(true), 300);
  }, [data?.vtt]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onSubmit = async (values, helpers) => {
    try {
      const { data } = await client.saveProject(
        params.id,
        compileVTT(cues, updatedCues),
        values,
      );
      toast.success(data.message);
    } catch (err) {
      if (isMounted()) {
        helpers.setStatus({ success: false });
        helpers.setErrors({
          submit: err?.response?.data?.message || err.message,
        });
        helpers.setSubmitting(false);
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      backgroundColor: data?.metadata?.backgroundColor || "#ffbc02",
      fontColor: data?.metadata?.fontColor || "#000101",
      font: data?.metadata?.font || "Roboto",
      fontWeight: data?.metadata?.fontWeight || fontWeights[0],
      fontSize: data?.metadata?.fontSize || 17,
      position: data?.metadata?.position || 50,
    },
    validationSchema: yup.object().shape({
      backgroundColor: yup.string().required("Required"),
      fontColor: yup.string().required("Required"),
      font: yup.string(),
      fontSize: yup.number().min(MIN_FONT).max(MAX_FONT),
      position: yup.number().min(MIN_POSITION).max(MAX_POSITION),
    }),
    onSubmit,
  });

  return (
    <>
      <title>SubmagicPro - Upload</title>
      <ProgressBar loading={loading} progress={progress} />
      <Box
        sx={{
          display: !loading && canShow ? "flex" : "none",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Box maxWidth="sm">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="inherit"
            textColor="secondary"
            variant="fullWidth"
            aria-label="full width Upload Tab"
            sx={{
              mb: 1,
            }}
          >
            <Tab label="Transcription" sx={tabStyle} {...a11yProps(0)} />
            <Tab label="Design" sx={tabStyle} {...a11yProps(1)} />
          </Tabs>
          <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
            <TranscriptionTabPanel
              cues={cues}
              initialValues={initialValues}
              showInputs={showInputs}
              setShowInputs={setShowInputs}
              selectedCue={selectedCue}
              setSelectedCue={setSelectedCue}
              setUpdatedCues={setUpdatedCues}
              setStartPos={setStartPos}
            />
            <DesignTabPanel
              index={1}
              setMetadata={setMetadata}
              formik={formik}
            />
          </SwipeableViews>
        </Box>
        <VideoPlayer
          data={data}
          updatedCues={updatedCues}
          setSelectedCue={setSelectedCue}
          startPos={startPos}
          selectedCue={selectedCue}
          metadata={metadata}
        />
      </Box>
    </>
  );
}
