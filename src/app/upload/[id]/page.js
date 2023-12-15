"use client";

import { useCallback, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";

import DesignTabPanel from "@/components/upload/tab-design";
import VideoPlayer from "@/components/upload/video-player";
import {
  generateCues2Vtt,
  generateRawVtt,
  normalizeCue,
  parseRawVtt,
  saveText,
} from "@/utils";
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
import EditableTranscriptionPanel from "@/components/upload/tab-editable-transcription";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

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
  const [newCues, setNewCues] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedCue, setSelectedCue] = useState({});
  const [startPos, setStartPos] = useState(0);
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
          generateRawVtt(content),
          formik.values,
        );
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      const fileName = data.fileName.slice(0, -4);
      saveText(`${fileName}.srt`, generateCues2Vtt(content));
      toast.success("Successfully downloaded a srt");
    }
  };

  useEffect(() => {
    if (content?.length < 1) return;
    setHandleSave(handleSave);
    setHandleExport(handleExport);
  }, [content, metadata]);

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
      if (!data?.rawVtt) return;
      const parsed = parseRawVtt(data.rawVtt, data.metadata);
      setNewCues(parsed);
      if (parsed.length > 0) {
        setSelectedCue(parsed[0]);
        setTimeout(() => setCanShow(true), 300);
      }
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
        generateRawVtt(content),
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
      <title>Cap Hacker - Upload</title>
      <ProgressModal loading={loading} progress={progress} />
      <Grid
        container
        sx={{
          display: canShow ? "flex" : "none",
          flexWrap: "wrap-reverse",
          width: 1,
        }}
      >
        <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
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
          <CustomTabPanel index={0} value={value}>
            <EditableTranscriptionPanel
              newCues={newCues}
              setStartPos={setStartPos}
              setSelectedCue={setSelectedCue}
              selectedCue={selectedCue}
              setContent={setContent}
              content={content}
            />
          </CustomTabPanel>
          <CustomTabPanel index={1} value={value}>
            <DesignTabPanel
              index={1}
              value={1}
              setMetadata={setMetadata}
              formik={formik}
            />
          </CustomTabPanel>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VideoPlayer
            data={data}
            content={content}
            setSelectedCue={setSelectedCue}
            startPos={startPos}
            setStartPos={setStartPos}
            selectedCue={selectedCue}
            metadata={metadata}
          />
        </Grid>
      </Grid>
    </>
  );
}
