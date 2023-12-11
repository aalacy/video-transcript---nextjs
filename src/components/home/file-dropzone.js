"use client";

import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ContentCopy as DuplicateIcon,
  Close as XIcon,
} from "@mui/icons-material";
import { createRef, useCallback, useEffect, useState } from "react";

import { bytesToSize } from "@/utils/byte-to-size";
import { useAuth } from "@/hooks/use-auth";
import {
  ReadyToDownloadIcon,
  TranscribingIcon,
  UploadPlusIcon,
  UploadingIcon,
} from "@/icons";
import ProgressBar from "../common/progress-bar";
import {
  DEFAULT_FILE_SIZE,
  GUEST_FILE_SIZE,
  MESSAGE_DOWNLOADING,
  MESSAGE_TRANSCRIBING,
  MESSAGE_UPLOADING,
} from "@/constants";
import VideoPlayer from "../upload/video-player";
import EditableTranscriptionPanel from "../upload/tab-editable-transcription";
import { parseRawVtt } from "@/utils";

export const FileDropzone = (props) => {
  const {
    accept,
    disabled,
    files,
    setFiles,
    getFilesFromEvent,
    maxFiles,
    maxSize,
    minSize,
    noClick,
    noDrag,
    noDragEventsBubbling,
    noKeyboard,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    onRemove,
    onRemoveAll,
    onUpload,
    handleExport,
    preventDropOnDocument,
    setError,
    loaded,
    setLoaded,
    setSize,
    setCurFile,
    newCues,
    setNewCues,
    setContent,
    content,
    ...other
  } = props;

  const { isAuthenticated, progress, loading, showDownload } = useAuth();

  // We did not add the remaining props to avoid component complexity
  // but you can simply add it if you need to.
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      maxFiles,
      maxSize,
      minSize,
      onDrop,
      multiple: false,
      disabled: loading || showDownload,
    });

  const videoRef = createRef();

  const [selectedCue, setSelectedCue] = useState({});
  const [startPos, setStartPos] = useState(0);

  const videoEventListener = (params) => {
    console.log("params", params);
    const height = params.target.videoHeight;
    const width = params.target.videoWidth;
    setSize({ width, height });
    // if (width > 1080) {
    //   setLoaded(false);
    //   setTimeout(() => {
    //     setError(true);

    //     videoRef.current = null;
    //     setFiles([]);
    //   }, 0);
    // } else {
    setLoaded(true);
    // }
  };

  useEffect(() => {
    if (!videoRef.current) return;
    document
      .getElementById("videoRef")
      .addEventListener("loadedmetadata", videoEventListener, { once: true });

    return () =>
      document
        .getElementById("videoRef")
        ?.removeEventListener("loadedmetadata");
  }, [files?.length]);

  const HomeCenterIcon = useCallback(
    ({ message }) => {
      if (message === MESSAGE_UPLOADING)
        return <UploadingIcon sx={{ fontSize: 50 }} />;
      else if (message === MESSAGE_DOWNLOADING)
        return <ReadyToDownloadIcon sx={{ fontSize: 50 }} />;
      else if (message === MESSAGE_TRANSCRIBING)
        return <TranscribingIcon sx={{ fontSize: 50 }} />;
      return <UploadPlusIcon sx={{ fontSize: 50 }} />;
    },
    [loading, progress],
  );

  useEffect(() => {
    if (!progress?.file) return;
    setCurFile(progress.file);

    const parsed = parseRawVtt(progress.file.rawVtt, progress.file.metadata);
    setNewCues(parsed);
  }, [progress?.file]);

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          margin: "0 auto",
        }}
      >
        {progress?.file && showDownload ? (
          <EditableTranscriptionPanel
            newCues={newCues}
            setStartPos={setStartPos}
            setSelectedCue={setSelectedCue}
            selectedCue={selectedCue}
            setContent={setContent}
            content={content}
          />
        ) : null}
        <Box
          sx={{
            maxWidth: "sm",
            width: 1,
            alignItems: "center",
            borderRadius: 4,
            borderStyle: "dashed",
            borderColor: "divider",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            outline: "none",
            ...(isDragActive && {
              backgroundColor: "action.active",
              opacity: 0.5,
            }),
            "&:hover": {
              backgroundColor:
                showDownload || loading ? "default" : "action.hover",
              cursor: showDownload || loading ? "default" : "pointer",
              opacity: showDownload || loading ? 1 : 0.5,
            },
          }}
          {...getRootProps()}
        >
          {showDownload ? (
            <VideoPlayer
              data={progress?.file}
              content={content}
              setSelectedCue={setSelectedCue}
              startPos={startPos}
              selectedCue={selectedCue}
              metadata={progress?.file.metadata}
            />
          ) : (
            <input {...getInputProps()} />
          )}

          <Box
            sx={{
              p: 6,
              px: 2,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ mb: 2 }}>
              {showDownload ? null : HomeCenterIcon(progress)}
            </Box>
            {loading || showDownload || progress?.percent ? (
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{
                  display: progress?.percent ? "inherit" : "none",
                }}
              >
                {progress?.message}&nbsp;{progress?.percent?.toFixed(2)}%...
              </Typography>
            ) : (
              <>
                <Typography fontWeight="bold" variant="h6">
                  Click to upload a file or drag and drop it here
                </Typography>
                <Typography fontWeight="medium" variant="h6">
                  Up to{" "}
                  <b>
                    {isAuthenticated ? DEFAULT_FILE_SIZE : GUEST_FILE_SIZE}MB
                  </b>{" "}
                  in size.
                </Typography>
                <Typography variant="caption" color="GrayText">
                  MP4, MOV formats {/*& 1:1, 4:5, 9:16 ratio accepted */}
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "sm",
        }}
      >
        <ProgressBar loading={loading} progress={progress} />
      </Box>
      {files.length > 0 && loaded ? (
        <Box sx={{ margin: "0 auto", mt: 2, maxWidth: "sm" }}>
          <List>
            {files.map((file) => (
              <ListItem
                key={file.path}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  "& + &": {
                    mt: 1,
                  },
                }}
              >
                <ListItemIcon>
                  <DuplicateIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    color: "textPrimary",
                    variant: "subtitle2",
                  }}
                  secondary={bytesToSize(file.size)}
                />
                <Tooltip title="Remove">
                  <IconButton
                    edge="end"
                    onClick={() => onRemove && onRemove(file)}
                  >
                    <XIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "sm",
          display: loaded || loading || showDownload ? "flex" : "none",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <Button
          onClick={showDownload ? handleExport : onUpload}
          size="small"
          sx={{ width: 1 }}
          type="button"
          variant="contained"
          disabled={loading}
        >
          {showDownload ? "Download" : "Generate"}
        </Button>
      </Box>
      {files.length > 0 && acceptedFiles.length > 0 ? (
        <video
          id="videoRef"
          src={URL.createObjectURL(acceptedFiles[0])}
          ref={videoRef}
          style={{ display: "none" }}
        />
      ) : null}
    </div>
  );
};

FileDropzone.propTypes = {
  disabled: PropTypes.bool,
  files: PropTypes.array,
  setFiles: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onError: PropTypes.func,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
  handleExport: PropTypes.func,
  setCurFile: PropTypes.func,
  setUpdatedCues: PropTypes.func,
};

FileDropzone.defaultProps = {
  files: [],
};
