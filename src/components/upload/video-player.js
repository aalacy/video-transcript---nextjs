"use client";

import { DEFAULT_DESIGN, GOOGLE_FONTS } from "@/constants";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

import "./style.css";

const WIDTH = 320;

export default function VideoPlayer(props) {
  const { metadata, data, startPos, selectedCue, setSelectedCue, updatedCues } =
    props;

  const ref = useRef();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!startPos) return;
    setPlaying(false);
    ref.current.seekTo(startPos, "seconds");
  }, [startPos]);

  const handleProgress = (progress) => {
    if (!setSelectedCue) return;
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

  const textShadow = useMemo(() => {
    const { backgroundColor, textOutline, textShadow } = metadata;
    const color = backgroundColor || DEFAULT_DESIGN.backgroundColor;
    const factor = 1.1 * textShadow + (textShadow - 1) * 0.2;
    if (textShadow)
      return `${factor / 2}px ${factor / 2}px ${factor / 2}px ${color}`;
    else if (textOutline) return `0px 2px ${textOutline}px ${color}`;
    else return "inherit";
  }, [metadata]);

  return (
    <Box
      id="video-player"
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
        config={{
          file: {
            attributes: {
              controlsList: "nofullscreen",
            },
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: `calc(${metadata.position || 50}%)`,
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "center",
          width: 1,
        }}
      >
        <Typography
          component="div"
          sx={{
            lineHeight: 1,
            textAlign: "center",
            marginTop: "-1em",
            fontWeight: metadata.fontWeight || DEFAULT_DESIGN.fontWeight,
            fontStyle: metadata.fontStyle || DEFAULT_DESIGN.fontStyle,
            textTransform:
              metadata.textTransform || DEFAULT_DESIGN.textTransform,
            fontSize: (metadata.fontSize || DEFAULT_DESIGN.fontSize) * 0.78,
            fontFamily: GOOGLE_FONTS[metadata.font] || DEFAULT_DESIGN.font,
            color: metadata.fontColor || DEFAULT_DESIGN.color,
            backgroundColor:
              metadata.textOutline || metadata.textShadow
                ? "inherit"
                : metadata.backgroundColor || DEFAULT_DESIGN.backgroundColor,
            "-webkit-text-fill-color":
              metadata.fontColor || DEFAULT_DESIGN.color,
            "-webkit-text-stroke-color": metadata.textOutline
              ? metadata.backgroundColor || DEFAULT_DESIGN.backgroundColor
              : "transparent",
            "-webkit-text-stroke": `${metadata.textOutline / 2}px`,
            textShadow,
            mx: 3,
            px: "2px",
            wordWrap: "break-word",
            maxWidth: WIDTH,
          }}
        >
          {selectedCue?.text}
        </Typography>
      </Box>
    </Box>
  );
}
