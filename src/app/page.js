"use client";

import { Box, TextField, MenuItem, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";

import { FileService } from "@/service/file-service";
import { isoLangs } from "@/constants";
import { FileDropzone } from "@/components/home/file-dropzone";
import { useAuth } from "@/hooks/use-auth";
import ProgressBar from "@/components/common/progress-bar";
import HowItWorks from "@/components/home/how-it-works";
import CreateContentLike from "@/components/home/create-content-like";
import SubmagicProVsTraditional from "@/components/home/compare";
import UnmatchedFeatures from "@/components/home/unmatched-features";
import About from "@/components/home/about";
import Faq from "@/components/home/faq";

const client = new FileService();

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [fileError, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [size, setSize] = useState({});

  const {
    loading,
    setLoading,
    progress,
    setTitleInfo,
    setShowDownload,
    visitorId,
    isAuthenticated,
  } = useAuth();

  const initialValues = {
    lang: "en",
  };

  const validationSchema = yup.object().shape({
    lang: yup.string(),
  });

  const handleDrop = (newFiles, fileRejections) => {
    setFiles(() => [...newFiles]);
    if (fileRejections.length) {
      const { file, errors } = fileRejections[0];
      const { name } = file;
      const { code } = errors[0];
      let message = "";
      if (code === "file-too-large") {
        message = `The file ${name} is larger than ${MAX_SIZE}MB.`;
      } else if (code === "file-invalid-type") {
        message = `The file ${name} is not MP4 or MOV format.`;
      }
      toast.error(message);
    }
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path),
    );
    setLoaded(false);
  };

  const handleRemoveAll = () => {
    setFiles([]);
    setLoaded(false);
  };

  const onUpload = async () => {
    setLoading(true);
    try {
      await client.upload({
        file: files[0],
        ...size,
        lang: formik.values.lang,
        visitorId,
      });
      setFiles([]);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    if (!fileError) return;
    setError(false);
    toast.error(
      "Video width exceeds 1080px limit, please resize it. (TikTok/Reels/Short format only)",
    );
  }, [fileError]);

  useEffect(() => {
    setTitleInfo({ title: "" });
    return () => setShowDownload(false);
  }, []);

  const maxSize = useMemo(() => {
    return isAuthenticated ? 300 * 1024 * 1024 : 50 * 1024 * 1024;
  }, [isAuthenticated]);

  return (
    <>
      <title>SubmagicPro</title>

      <ProgressBar loading={loading} progress={progress} />
      <form
        style={{ display: loading ? "none" : "inherit" }}
        onSubmit={formik.handleSubmit}
      >
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            maxWidth: "sm",
            margin: "0 auto",
            mb: 2,
            width: 1,
            gap: 3,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            AI Video Caption Generator Free Without Watermark
          </Typography>
          <TextField
            select
            fullWidth
            type="text"
            size="small"
            label={`* Language (${isoLangs.length} options)`}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lang}
            name="lang"
            error={!!formik.touched.lang && !!formik.errors.lang}
            helperText={formik.touched.lang && formik.errors.lang}
          >
            {isoLangs.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <FileDropzone
          // accept={{ "video/*": [".mp4", ".mov"] }}
          files={files}
          setFiles={setFiles}
          maxFiles={1}
          maxSize={maxSize}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          onUpload={onUpload}
          setError={setError}
          loaded={loaded}
          setLoaded={setLoaded}
          setSize={setSize}
        />
      </form>
      {!isAuthenticated ? (
        <>
          <HowItWorks />
          <CreateContentLike />
          <SubmagicProVsTraditional />
          <UnmatchedFeatures />
          <About />
          <Faq />
        </>
      ) : null}
    </>
  );
}
