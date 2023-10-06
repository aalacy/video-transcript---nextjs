"use client";

import { Box, Typography } from "@mui/material";
import ReactPlayer from "react-player";

export default function VideoPlayer(props) {
  const { values, url } = props;

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <ReactPlayer controls url={url} width="300px" height="100%" />
      <Typography
        sx={{
          position: "absolute",
          top: values.position || 100,
          width: 1,
          textAlign: "center",
          fontWeight: values.fontWeight || "medium",
          fontSize: values.fontSize || 16,
          fontFamily: values.font || "Arial",
          color: values.fontColor || "inherit",
        }}
      >
        SubmagicPro
      </Typography>
    </Box>
  );
}
