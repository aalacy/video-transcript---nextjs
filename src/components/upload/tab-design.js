"use client";

import {
  Card,
  CardContent,
  Box,
  TextField,
  useMediaQuery,
  FormHelperText,
  Typography,
  Stack,
  Slider,
  InputAdornment,
} from "@mui/material";

import { MuiColorInput } from "mui-color-input";
import { useEffect } from "react";

import {
  MIN_FONT,
  MAX_FONT,
  MIN_POSITION,
  MAX_POSITION,
  MIN_SHADOW,
  MAX_SHADOW,
} from "@/constants";
import FontWeightSelect from "./design/design-weight";
import FontTransformSelect from "./design/design-transform";
import FontStyleSelect from "./design/design-style";
import FontSelect from "./design/design-font";
import TemplateSelect from "./design/design-template";

export default function DesignTabPanel(props) {
  const { setMetadata, formik } = props;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setMetadata(formik.values);
    if (formik?.values?.template === 4 || formik?.values?.template === 5) {
      formik.setFieldValue("textOutline", 0);
      formik.setFieldValue("textShadow", 0);
    }
  }, [formik.values]);

  return (
    <Card>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            <Box sx={{ gridColumn: "span 2" }}>
              <TemplateSelect formik={formik} />
            </Box>
            <Box sx={{ gridColumn: "span 2" }}>
              <FontSelect formik={formik} />
              <Stack direction="row" spacing={1}>
                <FontWeightSelect formik={formik} />
                <FontTransformSelect formik={formik} />
                <FontStyleSelect formik={formik} />
              </Stack>
            </Box>
            <Stack
              sx={{
                gridColumn: "span 2",
                border: 1,
                borderColor: "GrayText",
                p: 1,
                borderRadius: 3,
              }}
            >
              <Typography
                id="outline-slider"
                variant="caption"
                color="GrayText"
              >
                Text Outline
              </Typography>
              <Slider
                aria-label="text outline steps"
                value={
                  typeof formik.values.textOutline === "number"
                    ? formik.values.textOutline
                    : 0
                }
                onChange={(event, value) =>
                  formik.setFieldValue("textOutline", value)
                }
                valueLabelDisplay="auto"
                aria-labelledby="outline-slider"
                step={1}
                marks
                min={MIN_SHADOW}
                max={MAX_SHADOW}
                sx={{
                  ml: 1,
                  width: "90%",
                  mb: 1,
                }}
                disabled={
                  formik?.values?.textShadow > 0 ||
                  formik?.values?.template === 4 ||
                  formik?.values?.template === 5
                }
              />
              <MuiColorInput
                fullWidth
                size="small"
                format="hex8"
                name="outlineColor"
                label="Outline Color"
                value={formik.values.outlineColor}
                onChange={(color) =>
                  formik.setFieldValue("outlineColor", color)
                }
                error={
                  !!formik.touched.outlineColor && !!formik.errors.outlineColor
                }
                helperText={
                  formik.touched.outlineColor && formik.errors.outlineColor
                }
                disabled={
                  formik?.values?.textOutline < 1 ||
                  formik?.values?.textShadow > 0 ||
                  formik?.values?.template === 4 ||
                  formik?.values?.template === 5
                }
                sx={{ gridColumn: "span 2" }}
              />
            </Stack>
            <Stack
              sx={{
                gridColumn: "span 2",
                border: 1,
                borderColor: "GrayText",
                p: 1,
                borderRadius: 3,
              }}
            >
              <Typography id="shadow-slider" variant="caption" color="GrayText">
                Text Shadow
              </Typography>
              <Slider
                aria-label="text shadow steps"
                value={
                  typeof formik.values.textShadow === "number"
                    ? formik.values.textShadow
                    : 0
                }
                onChange={(event, value) =>
                  formik.setFieldValue("textShadow", value)
                }
                disabled={
                  formik?.values?.template === 4 ||
                  formik?.values?.template === 5
                }
                valueLabelDisplay="auto"
                aria-labelledby="shadow-slider"
                step={1}
                marks
                min={MIN_SHADOW}
                max={MAX_SHADOW}
                sx={{
                  ml: 1,
                  width: "90%",
                  mb: 1,
                }}
              />
              <MuiColorInput
                fullWidth
                size="small"
                format="hex8"
                name="shadowColor"
                label="Shadow Color"
                value={formik.values.shadowColor}
                onChange={(color) => formik.setFieldValue("shadowColor", color)}
                error={
                  !!formik.touched.shadowColor && !!formik.errors.shadowColor
                }
                helperText={
                  formik.touched.shadowColor && formik.errors.shadowColor
                }
                disabled={
                  formik?.values?.textShadow < 1 ||
                  formik?.values?.template === 4 ||
                  formik?.values?.template === 5
                }
                sx={{ gridColumn: "span 2" }}
              />
            </Stack>
            <MuiColorInput
              fullWidth
              size="small"
              format="hex8"
              name="backgroundColor"
              label="Background Color"
              value={formik.values.backgroundColor}
              onChange={(color) =>
                formik.setFieldValue("backgroundColor", color)
              }
              error={
                !!formik.touched.backgroundColor &&
                !!formik.errors.backgroundColor
              }
              helperText={
                formik.touched.backgroundColor && formik.errors.backgroundColor
              }
              disabled={
                formik?.values?.textShadow > 0 ||
                formik?.values?.textOutline > 0
              }
              sx={{ gridColumn: "span 2" }}
            />
            <MuiColorInput
              fullWidth
              size="small"
              format="hex8"
              name="fontColor"
              label="Font Color"
              value={formik.values.fontColor}
              onChange={(color) => formik.setFieldValue("fontColor", color)}
              error={!!formik.touched.fontColor && !!formik.errors.fontColor}
              helperText={formik.touched.fontColor && formik.errors.fontColor}
              sx={{ gridColumn: "span 2" }}
            />
            <Stack sx={{ gridColumn: "span 2" }}>
              <TextField
                fullWidth
                type="number"
                size="small"
                label="Position"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.position}
                name="position"
                error={!!formik.touched.position && !!formik.errors.position}
                helperText={formik.touched.position && formik.errors.position}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
              <Slider
                value={
                  typeof formik.values.position === "number"
                    ? formik.values.position
                    : 0
                }
                onChange={(event, value) =>
                  formik.setFieldValue("position", value)
                }
                aria-labelledby="input-slider"
                min={MIN_POSITION}
                max={MAX_POSITION}
                sx={{
                  ml: 2,
                  width: "90%",
                }}
              />
            </Stack>
            <Stack sx={{ gridColumn: "span 2" }}>
              <TextField
                fullWidth
                type="number"
                size="small"
                label="Font Size"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fontSize}
                name="fontSize"
                error={!!formik.touched.fontSize && !!formik.errors.fontSize}
                helperText={formik.touched.fontSize && formik.errors.fontSize}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">px</InputAdornment>
                  ),
                }}
              />
              <Slider
                value={
                  typeof formik.values.fontSize === "number"
                    ? formik.values.fontSize
                    : 0
                }
                onChange={(event, value) =>
                  formik.setFieldValue("fontSize", value)
                }
                aria-labelledby="input-slider"
                min={MIN_FONT}
                max={MAX_FONT}
                sx={{
                  ml: 2,
                  width: "90%",
                }}
              />
            </Stack>
          </Box>
          {formik.errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Box>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
