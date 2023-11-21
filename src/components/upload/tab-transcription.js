"use client";

import {
  Box,
  Card,
  CardContent,
  List,
  ListItemButton,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  FormHelperText,
  ListItem,
} from "@mui/material";
import { UndoOutlined as UndoIcon } from "@mui/icons-material";
import { useCallback, useEffect } from "react";
import { useFormik } from "formik";

export default function TranscriptionTabPanel(props) {
  const {
    cues,
    initialValues,
    showInputs,
    setShowInputs,
    selectedCue,
    setSelectedCue,
    setUpdatedCues,
    setStartPos,
  } = props;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
  });

  const handleTextClick = (identifier) => {
    setShowInputs((prev) => ({ ...prev, [identifier]: true }));
  };

  const handleBlur = (identifier) => {
    setShowInputs((prev) => ({ ...prev, [identifier]: false }));
    setSelectedCue({
      ...selectedCue,
      identifier,
      text: formik.values[identifier],
    });
  };

  const handleUndo = (identifier) => {
    const value = cues.find((cue) => cue.identifier === identifier);
    formik.setFieldValue(identifier, value.text);
    setSelectedCue({ ...selectedCue, identifier, text: value.text });
  };

  const hasChanged = useCallback(
    (identifier) => {
      if (!formik.values || Object.keys(formik.values).length === 0) return;
      const orgValue = cues.find((cue) => cue.identifier === identifier);
      const formikValue = formik.values[identifier];
      return formikValue !== orgValue.text;
    },
    [formik.values],
  );

  useEffect(() => {
    if (!formik.values || Object.keys(formik.values).length === 0) return;
    setUpdatedCues(
      cues.map((cue) => ({ ...cue, text: formik.values[cue.identifier] })),
    );
  }, [formik.values]);

  useEffect(() => {
    if (!selectedCue.identifier) return;
    document
      .querySelector(`#item-${selectedCue.identifier}`)
      .scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedCue]);

  return (
    <Card sx={{ alignSelf: "baseline" }}>
      <CardContent sx={{ overflow: "auto", maxHeight: 460 }}>
        {cues.length > 0 ? (
          <form noValidate onSubmit={formik.handleSubmit}>
            <List disablePadding>
              {cues?.map((cue) => (
                <ListItem
                  disableGutters
                  disablePadding
                  key={cue.identifier}
                  id={`item-${cue.identifier}`}
                  secondaryAction={
                    <>
                      {hasChanged(cue.identifier) ? (
                        <Tooltip title="Undo">
                          <IconButton
                            onClick={() => handleUndo(cue.identifier)}
                          >
                            <UndoIcon />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                    </>
                  }
                >
                  <ListItemButton
                    onClick={() => {
                      setSelectedCue({
                        identifier: cue.identifier,
                        start: cue.start,
                        text: formik.values[cue.identifier],
                      });
                      setStartPos(cue.start);
                    }}
                    selected={selectedCue.identifier === cue.identifier}
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
                        {cue.start} - {cue.end}
                      </Typography>
                      {showInputs[cue.identifier] ? (
                        <TextField
                          autoFocus
                          error={Boolean(
                            formik.touched[cue.identifier] &&
                              formik.errors[cue.identifier],
                          )}
                          fullWidth
                          helperText={
                            formik.touched[cue.identifier] &&
                            formik.errors[cue.identifier]
                          }
                          name={cue.identifier}
                          onBlur={() => handleBlur(cue.identifier)}
                          onChange={formik.handleChange}
                          size="small"
                          value={formik.values[cue.identifier]}
                        />
                      ) : (
                        <Typography
                          variant="h6"
                          fontWeight="light"
                          sx={{
                            mt: 1,
                          }}
                          onClick={() => handleTextClick(cue.identifier)}
                        >
                          {formik.values[cue.identifier]}
                        </Typography>
                      )}
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {formik.errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{formik.errors.submit}</FormHelperText>
              </Box>
            )}
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}
