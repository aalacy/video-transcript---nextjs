"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

const DEFAULT_TEXT = "SubmagicPro";

export default function VideoPlayer(props) {
  const { metadata, data, selectedCue, setSelectedCue, updatedCues } = props;

  const ref = useRef();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!selectedCue) return;
    setPlaying(false);
    ref.current.seekTo(selectedCue.start);
  }, [selectedCue]);

  const handleProgress = (progress) => {
    for (let val of updatedCues) {
      if (
        progress.playedSeconds > val.start &&
        progress.playedSeconds < val.end
      ) {
        setSelectedCue(val);
      }
    }
  };

  const boxRef = useRef();

  const scale = useMemo(() => {
    if (!data || !boxRef.current) return 1;
    return data.width / boxRef.current.offsetWidth;
  }, [data]);

  return (
    <Box
      ref={boxRef}
      sx={{
        position: "relative",
        aspectRatio: `${data?.width} / ${data?.height}`,
        transform: `scale(${scale})`,
      }}
    >
      <ReactPlayer
        playing={playing}
        ref={ref}
        controls
        url={data?.output}
        width="300px"
        height="100%"
        onProgress={handleProgress}
        style={{
          "& > video": {
            borderRadius: "10%",
          },
        }}
      />
      <Typography
        sx={{
          position: "absolute",
          top: `${metadata.position || 0}%`,
          width: 1,
          textAlign: "center",
          fontWeight: metadata.fontWeight || "medium",
          fontSize: metadata.fontSize || 16,
          fontFamily: metadata.font || "Arial",
          color: metadata.fontColor || "inherit",
          textShadow:
            "0 0 8px #000, 0 0 9px #000, 0 0 10px #000, 0 0 11px #000, 0 0 12px #000, 0 0 13px #000, 0 0 14px #000, 0 0 15px #000, 0 0 16px #000, 0 0 17px #000",
        }}
      >
        {selectedCue?.text || DEFAULT_TEXT}
      </Typography>
    </Box>
  );
}
