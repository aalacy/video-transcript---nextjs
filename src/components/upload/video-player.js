"use client";

import { DEFAULT_DESIGN, GOOGLE_FONTS } from "@/constants";
import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

import "./video-style.css";

const WIDTH = 320;

export default function VideoPlayer(props) {
  const { metadata, data, startPos, selectedCue, setSelectedCue, content } =
    props;

  const playerRef = useRef();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!startPos) return;
    setPlaying(false);
    playerRef.current.seekTo(startPos, "seconds");
  }, [startPos]);

  const updateCurrentCueBasedTime = (time) => {
    for (let val of content) {
      if (time >= val.cues[0].start && time < val.cues.at(-1).end) {
        if (metadata.template === 4) {
          const curCue = {
            ...val,
            cues: val.cues.map((cue) => {
              if (time >= cue.start && time < cue.end) {
                return {
                  ...cue,
                  active: true,
                };
              } else return cue;
            }),
          };
          setSelectedCue(curCue);
        } /*else if (metadata.template === 5) {
      } */ else {
          setSelectedCue(val);
        }
      }
    }
  };

  const handleProgress = (progress) => {
    if (!setSelectedCue) return;
    updateCurrentCueBasedTime(progress.playedSeconds);
  };

  const handleSeek = (seek) => {
    updateCurrentCueBasedTime(seek);
  };

  const textShadow = useMemo(() => {
    const { shadowColor, outlineColor, textOutline, textShadow } = metadata;
    const shadowColor1 = shadowColor || DEFAULT_DESIGN.shadowColor;
    const outlineColor1 = outlineColor || DEFAULT_DESIGN.outlineColor;
    const shadowFactor = (1.1 * textShadow + (textShadow - 1) * 0.5) / 2;
    const outlineFactor = (1.1 * textOutline + (textOutline - 1) * 0.8) / 2;
    if (textShadow)
      return `${shadowFactor}px ${shadowFactor}px ${shadowFactor}px ${shadowColor1}`;
    else if (textOutline)
      return `0px 0.5px ${outlineFactor}px ${outlineColor1}`;
    else return "inherit";
  }, [metadata]);

  const WebkitTextStrokeColor = useMemo(() => {
    let color;
    if (metadata.textOutline) color = metadata.outlineColor;
    if (metadata.textShadow) color = metadata.shadowColor;
    if (metadata.textOutline < 1 && metadata.textShadow < 1)
      color = "transparent";

    return color || DEFAULT_DESIGN.backgroundColor;
  }, [metadata]);

  const backgroundColor = useCallback(
    (active) => {
      const { backgroundColor, template } = metadata;
      const bgColor = backgroundColor || DEFAULT_DESIGN.backgroundColor;
      if (template !== 4 && template !== 5) return bgColor;
      return active ? bgColor : "inherit";
    },
    [metadata],
  );

  const style = useCallback(
    (active) => {
      return {
        display: "inline-block",
        lineHeight: 1,
        textAlign: "center",
        marginTop: "-1em",
        fontWeight: metadata.fontWeight || DEFAULT_DESIGN.fontWeight,
        fontStyle: metadata.fontStyle || DEFAULT_DESIGN.fontStyle,
        textTransform: metadata.textTransform || DEFAULT_DESIGN.textTransform,
        fontSize: (metadata.fontSize || DEFAULT_DESIGN.fontSize) * 0.78,
        fontFamily: GOOGLE_FONTS[metadata.font] || DEFAULT_DESIGN.font,
        color: metadata.fontColor || DEFAULT_DESIGN.color,
        // WebkitTextFillColor: metadata.fontColor || DEFAULT_DESIGN.color,
        WebkitTextStrokeColor,
        backgroundColor: backgroundColor(active),
        textShadow,
        // mx: 3,
        p: "2px",
        // wordWrap: "break-word",
        wordBreak: "keep-all",
        maxWidth: WIDTH,
        // height: "fit-content",
        // inlineSize: (metadata.template === 4 || metadata.template === 5) ? `${selectedCue?.text.length * (metadata.fontSize || DEFAULT_DESIGN.fontSize) * 0.78 / 3}px` : 'auto',
      };
    },
    [metadata],
  );

  return (
    <Box
      id="video-player"
      sx={{
        position: "relative",
      }}
    >
      <ReactPlayer
        playing={playing}
        ref={playerRef}
        url={data?.output}
        controls
        playsinline
        width={`${WIDTH}px`}
        height="100%"
        progressInterval="50ms"
        onProgress={handleProgress}
        onSeek={handleSeek}
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
          display: "flex",
          justifyContent: "center",
          width: 1,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            maxWidth: WIDTH,
          }}
        >
          {selectedCue?.cues?.map(({ text, active, index }) => (
            <>
              <Typography key={index} component="div" sx={{ ...style(active) }}>
                {text}
              </Typography>
              {(metadata.template === 4 || metadata.template === 5) &&
              index === 1 ? (
                <br />
              ) : null}
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
