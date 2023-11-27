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
import { compileVTT, parseVtt, saveText } from "@/utils";
import { FileService } from "@/service/file-service";
import { useAuth } from "@/hooks/use-auth";

import {
  MIN_FONT,
  MAX_FONT,
  MIN_SHADOW,
  MAX_SHADOW,
  MIN_POSITION,
  MAX_POSITION,
  DEFAULT_DESIGN,
} from "@/constants";
import { useMounted } from "@/hooks/use-mounted";
import { gtm } from "@/utils/gtm";
import { ProgressModal } from "@/components/common/progress-popup";

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
};

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
    visitorId,
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

  const handleSave = () => {
    try {
      formik.submitForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleExport = async (type = "Video") => {
    if (type === "Video") {
      try {
        setLoading(true);
        await client.saveAndDownload(
          params.id,
          compileVTT(cues, updatedCues),
          formik.values,
        );
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      const fileName = data.fileName.slice(0, -4);
      saveText(`${fileName}.srt`, data.vtt);
      toast.success("Successfully downloaded a srt");
    }
  };

  useEffect(() => {
    if (cues?.length < 1 || updatedCues?.length < 1) return;
    setHandleSave(handleSave);
    setHandleExport(handleExport);
  }, [cues, updatedCues, metadata]);

  const getData = useCallback(async () => {
    try {
      const { data } = await client.get(params.id, visitorId);
      setTitleInfo({ title: data.fileName });
      setData(data);
      processData(data);
    } catch (error) {
      toast.error(error.message);
    }
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    getData();

    return () => {
      setHandleSave(null);
      setHandleExport(null);
    };
  }, []);

  const processData = useCallback(
    (data) => {
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
    },
    [data],
  );

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
      backgroundColor:
        data?.metadata?.backgroundColor || DEFAULT_DESIGN.backgroundColor,
      outlineColor: data?.metadata?.outlineColor || DEFAULT_DESIGN.outlineColor,
      shadowColor: data?.metadata?.shadowColor || DEFAULT_DESIGN.shadowColor,
      fontColor: data?.metadata?.fontColor || DEFAULT_DESIGN.fontColor,
      secondaryColor:
        data?.metadata?.secondaryColor || DEFAULT_DESIGN.secondaryColor,
      template: data?.metadata?.template || DEFAULT_DESIGN.template,
      font: data?.metadata?.font || DEFAULT_DESIGN.font,
      textTransform:
        data?.metadata?.textTransform || DEFAULT_DESIGN.textTransform,
      textShadow: data?.metadata?.textShadow || DEFAULT_DESIGN.textShadow,
      textOutline: data?.metadata?.textOutline || DEFAULT_DESIGN.textOutline,
      fontStyle: data?.metadata?.fontStyle || DEFAULT_DESIGN.fontStyle,
      fontWeight: data?.metadata?.fontWeight || DEFAULT_DESIGN.fontWeight,
      fontSize: data?.metadata?.fontSize || DEFAULT_DESIGN.fontSize,
      position: data?.metadata?.position || DEFAULT_DESIGN.position,
    },
    validationSchema: yup.object().shape({
      backgroundColor: yup.string().required("Required"),
      fontColor: yup.string().required("Required"),
      font: yup.string(),
      fontSize: yup.number().min(MIN_FONT).max(MAX_FONT),
      position: yup.number().min(MIN_POSITION).max(MAX_POSITION),
      textShadow: yup.number().min(MIN_SHADOW).max(MAX_SHADOW),
      textOutline: yup.number().min(MIN_SHADOW).max(MAX_SHADOW),
    }),
    onSubmit,
  });

  return (
    <>
      <title>SubmagicPro - Upload</title>
      <ProgressModal loading={loading} progress={progress} />
      <Box
        sx={{
          display: canShow ? "flex" : "none",
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
