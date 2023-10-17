"use client";

import { GOOGLE_FONTS } from "@/constants";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

const WIDTH = 320;

export default function VideoPlayer(props) {
  const { metadata, data, startPos, selectedCue, setSelectedCue, updatedCues } =
    props;

  const ref = useRef();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(false);
    ref.current.seekTo(startPos, "seconds");
  }, [startPos]);

  const handleProgress = (progress) => {
    for (let val of updatedCues) {
      if (
        progress.playedSeconds >= val.start &&
        progress.playedSeconds < val.end
      ) {
        setSelectedCue({
          ...val,
        });
      }
    }
  };

  const scale = useMemo(() => {
    if (!data) return 1;
    return data.width / WIDTH;
  }, [data]);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <ReactPlayer
        playing={playing}
        ref={ref}
        controls
        url={data?.output}
        width={`${WIDTH}px`}
        height="100%"
        onProgress={handleProgress}
        style={{
          "& > video": {
            borderRadius: "10%",
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: `calc(${metadata.position || 0}% - 30px)`,
          display: "flex",
          justifyContent: "center",
          width: 1,
        }}
      >
        <Typography
          component="span"
          sx={{
            lineHeight: 1,
            textAlign: "center",
            fontWeight: metadata.fontWeight || "medium",
            fontStyle: metadata.fontWeight,
            fontSize: (metadata.fontSize || 16) * scale * 0.5,
            fontFamily: GOOGLE_FONTS[metadata.font] || "Arial",
            color: metadata.fontColor || "inherit",
            backgroundColor: metadata.backgroundColor || "inherit",
          }}
        >
          {selectedCue?.text}
        </Typography>
      </Box>
    </Box>
  );
}
