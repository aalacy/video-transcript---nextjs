"use client";

import { useCallback, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, Box, Container } from "@mui/material";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import DesignTabPanel from "@/components/upload/tab-design";
import VideoPlayer from "@/components/upload/video-player";
import TranscriptionTabPanel from "@/components/upload/tab-transcription";
import { compileVTT, downloadMedia, parseVtt } from "@/utils";
import { FileService } from "@/service/file-service";
import { TabSkeleton } from "@/components/skeleton/tab-skeleton";
import { useAuth } from "@/hooks/use-auth";
import RootLayout from "@/components/common/layout";

import {
  fonts,
  fontWeights,
  MIN_FONT,
  MAX_FONT,
  MIN_POSITION,
  MAX_POSITION,
} from "@/constants";
import { useMounted } from "@/hooks/use-mounted";

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
  const { setTitleInfo } = useAuth();
  const isMounted = useMounted();

  const [value, setValue] = useState(0);
  const [metadata, setMetadata] = useState({});
  const [cues, setCues] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [showInputs, setShowInputs] = useState({});
  const [selectedCue, setSelectedCue] = useState({});
  const [updatedCues, setUpdatedCues] = useState([]);
  const [loading, setLoading] = useState();
  const [data, setData] = useState({});
  const [canShow, setCanShow] = useState();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await client.get(params.id);
      setTitleInfo({ title: data.fileName });
      setData(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!data?.vtt) return;
    const parsed = parseVtt(data.vtt);
    const obj = {};
    const bools = {};
    if (parsed.valid) {
      setCues(parsed.cues);
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

  const onSubmit = (values, helpers) => {
    try {
      client.generateVideo(params.id, compileVTT(cues, updatedCues), values);
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
    initialValues: {
      backgroundColor: "#4d1a7f",
      fontColor: "#76f016",
      font: fonts[0],
      fontWeight: fontWeights[0],
      fontSize: MIN_FONT,
      position: 50,
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

  const handleSave = async () => {
    try {
      setLoading(true);
      await formik.submitForm();
      toast.success("Successfully saved.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      const { data } = await client.download(params.id);
      downloadMedia(
        `${data.fileName.substr(0, -4)}-subtitled.${data.ext}`,
        data.output,
      );
      toast.success("Successfully exported.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RootLayout saveCallback={handleSave} exportCallback={handleExport}>
      <title>Upload</title>
      <Container maxWidth="md" sx={{ p: 3 }}>
        {loading || !canShow ? (
          <TabSkeleton />
        ) : (
          <Box
            sx={{
              display: "flex",
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
                />
                <DesignTabPanel
                  index={1}
                  setMetadata={setMetadata}
                  formik={formik}
                />
              </SwipeableViews>
            </Box>
            <Box>
              <VideoPlayer
                data={data}
                updatedCues={updatedCues}
                setSelectedCue={setSelectedCue}
                selectedCue={selectedCue}
                metadata={metadata}
              />
            </Box>
          </Box>
        )}
      </Container>
    </RootLayout>
  );
}
