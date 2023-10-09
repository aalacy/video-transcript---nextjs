"use client";

import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Button,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { UndoOutlined as UndoIcon } from "@mui/icons-material";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";

import { FileService } from "@/service/file-service";
import { compileVTT, parseVtt } from "@/utils";
import toast from "react-hot-toast";

const client = new FileService();

export default function TranscriptionTapPanel(props) {
  const { vtt, id } = props;

  const [cues, setCues] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [showInputs, setShowInputs] = useState({});

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values, helpers) => {
      try {
        await client.updateVTT(id, compileVTT(cues, values));
        toast.success("Successfully updated!");
      } catch (err) {
        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({
            submit: err?.response?.data?.message || err.message,
          });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  useEffect(() => {
    if (!vtt) return;
    const parsed = parseVtt(vtt);
    const obj = {};
    const bools = {};
    if (parsed.valid) {
      setCues(parsed.cues);
      Array.from(parsed.cues).forEach((cue) => {
        obj[cue.identifier] = cue.text;
        bools[cue.identifier] = false;
      });
    }
    setInitialValues(obj);
    setShowInputs(bools);
  }, [vtt]);

  useEffect(() => {}, [formik.values]);

  const handleTextClick = (identifier) => {
    setShowInputs((prev) => ({ ...prev, [identifier]: true }));
  };

  const handleBlur = (identifier) => {
    setShowInputs((prev) => ({ ...prev, [identifier]: false }));
  };

  const handleUndo = (identifier) => {
    const value = cues.find((cue) => cue.identifier === identifier);
    formik.setFieldValue(identifier, value.text);
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

  return (
    <Card>
      <CardContent>
        {cues.length > 0 ? (
          <form noValidate onSubmit={formik.handleSubmit}>
            <List sx={{ overflow: "auto", maxHeight: 460 }}>
              {cues?.map((cue) => (
                <ListItem
                  key={cue.identifier}
                  disablePadding
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
            <Box
              sx={{
                textAlign: "center",
                mt: 2,
              }}
            >
              <Button
                disabled={formik.isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                startIcon={
                  formik.isSubmitting ? (
                    <CircularProgress
                      sx={{ mr: 1 }}
                      color="warning"
                      size={20}
                    />
                  ) : null
                }
              >
                Save
              </Button>
            </Box>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}
