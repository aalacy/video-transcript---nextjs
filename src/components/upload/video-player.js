"use client";

import { DEFAULT_DESIGN, GOOGLE_FONTS } from "@/constants";
import { Box, Typography } from "@mui/material";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";

import "./video-style.css";

const WIDTH = 320;

export default function VideoPlayer(props) {
  const { metadata, data, startPos, selectedCue, setSelectedCue, content } =
    props;

  const playerRef = useRef();

  const [playInfo, setPlayInfo] = useState({
    playing: false,
    seeking: false,
    duration: 0,
  });

  useEffect(() => {
    if (!startPos) return;
    setPlayInfo({
      ...playInfo,
      playing: false,
    });
    playerRef.current.seekTo(+startPos, "seconds");
  }, [startPos]);

  const updateCurrentCueBasedTime = (time) => {
    for (let val of content) {
      if (time >= val.cues[0].start && time < val.cues.at(-1).end) {
        if (metadata.template === 4) {
          setSelectedCue({
            ...val,
            cues: val.cues.map((cue) => {
              if (time >= cue.start && time <= cue.end) {
                return {
                  ...cue,
                  active: true,
                };
              } else return cue;
            }),
          });
        } else if (metadata.template === 5) {
          const state = {};
          const curCue = {
            ...val,
            cues: val.cues.map((cue) => {
              if (time >= cue.start && time <= cue.end) {
                state[cue.index] = true;
                if (cue.index === 1 || cue.index === 3) {
                  val.cues.at(cue.index - 1).active = true;
                }
                if (cue.index >= 2) {
                  val.cues.at(0).active = false;
                  val.cues.at(1).active = false;
                }
                return {
                  ...cue,
                  active: true,
                };
              } else if (cue.index === 1 || cue.index === 3) {
                return {
                  ...cue,
                  active: state[cue.index - 1],
                };
              } else return cue;
            }),
          };
          setSelectedCue(curCue);
        } else {
          setSelectedCue(val);
        }
      }
    }
    setPlayInfo({
      ...playInfo,
      seeking: false,
    });
  };

  const handleProgress = (progress) => {
    if (!setSelectedCue || playInfo.seeking) return;
    setPlayInfo({ ...playInfo, ...progress, played: progress.played * 100 });
    updateCurrentCueBasedTime(progress.playedSeconds);
  };

  const handleSeek = (seek) => {
    setPlayInfo({
      ...playInfo,
      seeking: true,
    });
    updateCurrentCueBasedTime(seek);
  };

  const textShadow = useMemo(() => {
    const { shadowColor, outlineColor, textOutline, textShadow } = metadata;

    const shadowColor1 = shadowColor || DEFAULT_DESIGN.shadowColor;
    const outlineColor1 = outlineColor || DEFAULT_DESIGN.outlineColor;
    const shadowFactor = 0.8 * textShadow;
    const outlineFactor = 0.8 * textOutline;
    if (textShadow)
      return `${shadowFactor}px ${shadowFactor / 2}px 1px ${shadowColor1}`;
    else if (textOutline) return `0px 1px ${outlineFactor}px ${outlineColor1}`;
    else return "inherit";
  }, [metadata]);

  const WebkitTextStrokeColor = useMemo(() => {
    let color;
    const { textOutline, outlineColor, textShadow, shadowColor } = metadata;

    if (textOutline) color = outlineColor;
    if (textShadow) color = shadowColor;
    if (textOutline < 1 && textShadow < 1) color = "transparent";

    return color || DEFAULT_DESIGN.backgroundColor;
  }, [metadata]);

  const backgroundColor = useCallback(
    (active) => {
      const { backgroundColor, template } = metadata;

      const bgColor = backgroundColor || DEFAULT_DESIGN.backgroundColor;
      if (template === 4) return active ? bgColor : "inherit";
      else if (template === 5) return "inherit";
      return bgColor;
    },
    [metadata],
  );

  const color = useCallback(
    (active) => {
      const { fontColor, secondaryColor, template } = metadata;

      return template !== 5 || active
        ? fontColor || DEFAULT_DESIGN.color
        : secondaryColor;
    },
    [metadata],
  );

  const style = useCallback(
    (active) => {
      const { fontWeight, fontStyle, textTransform, fontSize } = metadata;

      return {
        display: "inline-block",
        lineHeight: 1,
        textAlign: "center",
        marginTop: "-1em",
        fontWeight: fontWeight || DEFAULT_DESIGN.fontWeight,
        fontStyle: fontStyle || DEFAULT_DESIGN.fontStyle,
        textTransform: textTransform || DEFAULT_DESIGN.textTransform,
        fontSize: (fontSize || DEFAULT_DESIGN.fontSize) * 0.78,
        fontFamily: GOOGLE_FONTS[metadata.font] || DEFAULT_DESIGN.font,
        color: color(active),
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
        playing={playInfo.playing}
        ref={playerRef}
        url={data?.output}
        controls
        playsinline
        width={`${WIDTH}px`}
        height="100%"
        progressInterval={50}
        onProgress={handleProgress}
        onSeek={handleSeek}
        onDuration={(duration) => setPlayInfo({ ...playInfo, duration })}
        onPlay={() => setPlayInfo({ ...playInfo, playing: true })}
        onPause={() => setPlayInfo({ ...playInfo, playing: false })}
        onEnded={() => setPlayInfo({ ...playInfo, playing: false })}
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
            <Fragment key={index}>
              <Typography component="div" sx={{ ...style(active) }}>
                {text}
              </Typography>
              {(metadata.template === 4 || metadata.template === 5) &&
              index === 1 ? (
                <br />
              ) : null}
            </Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
