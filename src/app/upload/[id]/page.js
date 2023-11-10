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
import { compileVTT, downloadMedia, parseVtt } from "@/utils";
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
import { gtm } from "@/utils/gtm";
import { ProgressModal } from "@/components/common/progress-popup";

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

  const handleSave = () => {
    try {
      formik.submitForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleExport = () => {
    try {
      // setLoading(true);
      // client.saveAndDownload(
      //   params.id,
      //   compileVTT(cues, updatedCues),
      //   formik.values,
      // );
      const file = {
        id: 16,
        localPath: "/tmp/8858ae60897bc9eb4d28c6f00",
        key: "8858ae60897bc9eb4d28c6f00",
        fileName: "small.mp4",
        lang: "en",
        audio:
          "https://submagicpro.blob.core.windows.net/data/8858ae60897bc9eb4d28c6f00-audio.mp3?sv=2023-08-03&st=2023-11-10T10%3A30%3A38Z&se=2023-11-10T11%3A35%3A38Z&sr=b&sp=r&sig=6vLpkmofX51cd%2BMEMfdF29wedmttHuu0V64ewcvVf5s%3D",
        thumbnail:
          "https://submagicpro.blob.core.windows.net/data/8858ae60897bc9eb4d28c6f00-thumbnail.png?sv=2023-08-03&st=2023-11-10T10%3A30%3A47Z&se=2023-11-10T11%3A35%3A47Z&sr=b&sp=r&sig=8nCm14dtYGjGQ0FANo%2FvaUzz5xl2e6mJT48W%2FYO2w8w%3D",
        output:
          "https://submagicpro.blob.core.windows.net/data/8858ae60897bc9eb4d28c6f00.mp4?sv=2023-08-03&st=2023-11-10T10%3A30%3A47Z&se=2023-11-10T11%3A35%3A47Z&sr=b&sp=r&sig=gYlgT8wp1J8xH7XqgWKkhWNrxMJ5NjsYr8Lv1Lx7%2BKg%3D",
        ext: "mp4",
        vtt: "\n0\n00:00:03,880 --> 00:00:05,179\nIn this video, I\n\n1\n00:00:05,179 --> 00:00:05,799\nwill show you how\n\n2\n00:00:05,799 --> 00:00:06,940\nyou can use ListenMonster\n\n3\n00:00:06,940 --> 00:00:08,139\nto transcribe your content\n",
        processId: "388fb9f2-a6db-4e0b-9bb4-f0ec44628758",
        duration: 9.466667,
        width: 720,
        height: 1280,
        metadata: {
          font: "Roboto",
          fontSize: 22,
          position: 50,
          fontColor: "#000101",
          fontWeight: "Light",
          backgroundColor: "#ffbc02",
        },
        status: "transcripted",
        userId: 3,
        visitorId: "6c4f3d46dd68f43ffe072ae633bd7268",
        createdAt: "2023-11-10T10:35:39.767Z",
        updatedAt: "2023-11-10T10:35:47.091Z",
      };
      downloadMedia(
        `${file.fileName.substr(0, -4)}-subtitled.${file.ext}`,
        file.output,
      );
    } catch (error) {
      debugger;
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cues?.length < 1 || updatedCues?.length < 1) return;
    setHandleSave(handleSave);
    setHandleExport(handleExport);
  }, [cues, updatedCues, metadata]);

  const getData = useCallback(async () => {
    try {
      const { data } = await client.get(params.id);
      setTitleInfo({ title: data.fileName });
      setData(data);
      processData(data);
    } catch (error) {
      debugger;
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
      backgroundColor: data?.metadata?.backgroundColor || "#ffbc02",
      fontColor: data?.metadata?.fontColor || "#000101",
      font: data?.metadata?.font || "Roboto",
      fontWeight: data?.metadata?.fontWeight || fontWeights[0],
      fontSize: data?.metadata?.fontSize || 22,
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
