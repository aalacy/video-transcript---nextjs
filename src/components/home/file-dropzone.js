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
  NoteAddOutlined as NoteAddOutlinedIcon,
} from "@mui/icons-material";
import { createRef, useEffect } from "react";

import { bytesToSize } from "@/utils/byte-to-size";
import { useAuth } from "@/hooks/use-auth";

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
    preventDropOnDocument,
    setError,
    loaded,
    setLoaded,
    setSize,
    ...other
  } = props;

  const { isAuthenticated } = useAuth();

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
    });

  const videoRef = createRef();

  const videoEventListener = (params) => {
    const height = params.target.videoHeight;
    const width = params.target.videoWidth;
    setSize({ width, height });
    if (width > 1080) {
      setLoaded(false);
      setTimeout(() => {
        setError(true);

        videoRef.current = null;
        setFiles([]);
      }, 0);
    } else {
      setLoaded(true);
    }
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
  }, [acceptedFiles?.length]);

  return (
    <div {...other}>
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "md",
          alignItems: "center",
          border: 1,
          borderRadius: 1,
          borderStyle: "dashed",
          borderColor: "divider",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          outline: "none",
          p: 6,
          ...(isDragActive && {
            backgroundColor: "action.active",
            opacity: 0.5,
          }),
          "&:hover": {
            backgroundColor: "action.hover",
            cursor: "pointer",
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <Box sx={{ p: 2, textAlign: "center" }}>
          <NoteAddOutlinedIcon color="primary" fontSize="large" />
          <Typography fontWeight="bold" variant="h5" sx={{ my: 2 }}>
            Click to upload a file or drag and drop it here
          </Typography>
          <Typography variant="body1" color="GrayText">
            Up to {isAuthenticated ? 300 : 50}MB in size.
          </Typography>
          <Typography variant="caption" color="GrayText">
            MP4, MOV formats & 1:1, 4:5, 9:16 ratio accepted
          </Typography>
        </Box>
      </Box>
      {files.length > 0 && loaded ? (
        <Box sx={{ mt: 2 }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
            }}
          >
            <Button onClick={onRemoveAll} size="small" type="button">
              Remove
            </Button>
            <Button
              onClick={onUpload}
              size="small"
              sx={{ ml: 2 }}
              type="button"
              variant="contained"
            >
              Upload
            </Button>
          </Box>
        </Box>
      ) : null}
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
};

FileDropzone.defaultProps = {
  files: [],
};
