"use client";

import { Box, TextField, MenuItem, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";

import { FileService } from "@/service/file-service";
import {
  DEFAULT_FILE_SIZE,
  GUEST_FILE_SIZE,
  MESSAGE_UPLOADING,
  isoLangs,
} from "@/constants";
import { FileDropzone } from "@/components/home/file-dropzone";
import { useAuth } from "@/hooks/use-auth";
import HowItWorks from "@/components/home/how-it-works";
import CreateContentLike from "@/components/home/create-content-like";
import SubmagicProVsTraditional from "@/components/home/compare";
import UnmatchedFeatures from "@/components/home/unmatched-features";
import About from "@/components/home/about";
import Faq from "@/components/home/faq";
import { gtm } from "@/utils/gtm";
import { YelloBottom } from "@/icons/yellow-bottom";
import { FreeStarIcon } from "@/icons/free-star";
import { Pattern } from "@/icons/pattern";
import GetMoreFeatures from "@/components/home/get-more-features";

const client = new FileService();

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [fileError, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [size, setSize] = useState({});
  const [curFile, setCurFile] = useState({});
  const [lang, setLang] = useState("en");
  const [newCues, setNewCues] = useState([]);
  const [content, setContent] = useState([]);

  const {
    setLoading,
    loading,
    setTitleInfo,
    setShowDownload,
    visitorId,
    isAuthenticated,
    showDownload,
    setProgress,
  } = useAuth();

  const handleDrop = (newFiles, fileRejections) => {
    setProgress({ percent: 0, message: "" });
    setFiles(() => [...newFiles]);
    if (fileRejections.length) {
      const { file, errors } = fileRejections[0];
      const { name } = file;
      const { code } = errors[0];
      let message = "";
      if (code === "file-too-large") {
        if (isAuthenticated)
          message = `The file ${name} is larger than ${
            isAuthenticated ? DEFAULT_FILE_SIZE : GUEST_FILE_SIZE
          }MB.`;
        else message = "Please sign up for large file size";
      } else if (code === "file-invalid-type") {
        message = `The file ${name} is not MP4 or MOV format.`;
      }
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    setLang(e.target.value);
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
    setLoaded(false);
    try {
      await client.upload(
        visitorId,
        {
          file: files[0],
          ...size,
          lang,
          visitorId,
        },
        (percent) => {
          setProgress({ percent: Number(percent), message: MESSAGE_UPLOADING });
        },
      );
      setFiles([]);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      await client.saveAndDownload(
        curFile.id,
        generateRawVtt(content),
        curFile.metadata,
        visitorId,
      );
      setShowDownload(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!fileError) return;
    setError(false);
    toast.error(
      "Video width exceeds 1080px limit, please resize it. (TikTok/Reels/Short format only)",
    );
  }, [fileError]);

  useEffect(() => {
    setTitleInfo({ title: "" });
    gtm.push({ event: "page_view" });
    return () => setShowDownload(false);
  }, []);

  const maxSize = useMemo(() => {
    return isAuthenticated
      ? DEFAULT_FILE_SIZE * 1024 * 1024
      : GUEST_FILE_SIZE * 1024 * 1024;
  }, [isAuthenticated]);

  return (
    <>
      <title>Submagic Pro - Free AI Video Caption Generator</title>
      <meta
        name="description"
        content="Submagic pro make adding words to your videos super easy and totally free. Our smart tool helps you create captions fast. Try it now"
      />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta
        name="robots"
        content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      />
      <meta property="og:url" content="https://submagic.pro/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Submagic Pro - Free AI Video Caption Generator"
      />
      <meta
        property="og:description"
        content="Submagic pro make make adding words to your videos super easy and totally free. Our smart tool helps you create captions fast. Try it now"
      />
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#febf4b" />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content="Submagic Pro" />
      <link rel="canonical" href="https://submagic.pro/" />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{
          maxWidth: "sm",
          margin: "0 auto",
          mb: 2,
          gap: 3,
          mt: 5,
        }}
      >
        <Box>
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            <Typography variant="h4" display="inline" zIndex={10}>
              AI Video Caption Generator Free
            </Typography>
            <FreeStarIcon
              sx={{
                fontSize: 106,
                position: "absolute",
                top: "-32px",
                right: "-20px",
              }}
            />
          </Box>
          <Typography variant="h4" sx={{ textAlign: "center" }} zIndex={10}>
            Without Watermark
          </Typography>
          <YelloBottom sx={{ width: 1, mt: -1 }} />
        </Box>
        <Typography
          color="GrayText"
          textAlign="center"
          variant="h6"
          fontWeight="light"
        >
          Unlock the magic of effortless captioning with SubMagic Pro – the free
          online caption generator for your videos.
        </Typography>
        <TextField
          select
          fullWidth
          type="text"
          size="small"
          disabled={loading}
          label={`* Language (${isoLangs.length} options)`}
          onChange={handleChange}
          value={lang}
          name="lang"
          sx={{
            display: showDownload ? "none" : "inherit",
          }}
        >
          {isoLangs.map((lang) => (
            <MenuItem key={lang.code} value={lang.code}>
              {lang.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <FileDropzone
        accept={{ "video/*": [".mp4", ".mov"] }}
        files={files}
        setFiles={setFiles}
        maxFiles={1}
        maxSize={maxSize}
        onDrop={handleDrop}
        onRemove={handleRemove}
        onRemoveAll={handleRemoveAll}
        onUpload={onUpload}
        handleExport={handleExport}
        setError={setError}
        loaded={loaded}
        setLoaded={setLoaded}
        setSize={setSize}
        newCues={newCues}
        setNewCues={setNewCues}
        setCurFile={setCurFile}
        setContent={setContent}
        content={content}
      />
      <Pattern sx={{ width: 1, fontSize: 250, margin: "0 auto", mt: -7 }} />
      {!isAuthenticated ? (
        <>
          <HowItWorks />
          <GetMoreFeatures />
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
