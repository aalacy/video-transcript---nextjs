"use client";

import {
  Box,
  Card,
  CardContent,
  List,
  ListItemButton,
  Typography,
  IconButton,
  Tooltip,
  ListItem,
} from "@mui/material";
import { useEffect } from "react";
import { UndoOutlined as UndoIcon } from "@mui/icons-material";
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";

import "./editable-style.css";
import { normalizeCue } from "@/utils";

const sanitizeConf = {
  allowedTags: [],
  allowedAttributes: {},
};

export default function EditableTranscriptionPanel(props) {
  const {
    content,
    setContent,
    newCues,
    setStartPos,
    setSelectedCue,
    selectedCue,
  } = props;

  const hasChanged = (identifier) => {
    return (
      JSON.stringify(newCues[identifier]) != JSON.stringify(content[identifier])
    );
  };

  const handleUndo = (identifier) => {
    setContent((prev) => {
      return prev.map((newCue) => {
        if (newCue.identifier === identifier) {
          return { ...newCues[identifier] };
        } else {
          return { ...newCue };
        }
      });
    });
  };

  const handleChange = (evt, identifier, index) => {
    setContent((prev) => {
      const updatedContent = prev.map((newCue) => {
        if (newCue.identifier === identifier) {
          return {
            identifier,
            cues: newCue.cues.map((cue) => {
              if (cue.index === index) {
                return {
                  ...cue,
                  text: sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf),
                };
              } else {
                return { ...cue };
              }
            }),
          };
        } else {
          return { ...newCue };
        }
      });
      setSelectedCue(updatedContent[identifier]);
      return updatedContent;
    });
  };

  useEffect(() => {
    if (newCues?.length < 1) return;

    setContent(newCues);
  }, [newCues]);

  useEffect(() => {
    if (!selectedCue.identifier) return;
    document
      .querySelector(`#item-${selectedCue.identifier}`)
      .scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedCue]);

  return (
    <Card sx={{ alignSelf: "baseline", width: 1 }}>
      <CardContent sx={{ overflow: "auto", maxHeight: 460 }}>
        <List disablePadding>
          {newCues?.map(({ identifier, cues }) => (
            <ListItem
              disableGutters
              disablePadding
              key={identifier}
              id={`item-${identifier}`}
              secondaryAction={
                <>
                  {hasChanged(identifier) ? (
                    <Tooltip title="Undo">
                      <IconButton onClick={() => handleUndo(identifier)}>
                        <UndoIcon />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </>
              }
            >
              <ListItemButton
                onClick={() => {
                  setSelectedCue({ identifier, cues });
                  setStartPos(cues[0].start);
                }}
                selected={selectedCue.identifier === identifier}
                sx={{
                  p: 2,
                  borderRadius: 8,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "error.main",
                      bgcolor: "warning.light",
                      px: 1,
                      borderRadius: 8,
                      opacity: 0.8,
                      alignSelf: "baseline",
                      display: "inline",
                    }}
                  >
                    {cues[0].start} - {cues.at(-1).end}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      pt: 1,
                    }}
                  >
                    {cues.map(({ index }) => (
                      <ContentEditable
                        key={index}
                        className="cue-editable"
                        html={content[identifier]?.cues[index]?.text || ""}
                        onChange={(e) => handleChange(e, identifier, index)}
                      />
                    ))}
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
