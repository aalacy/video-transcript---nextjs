"use client";

import {
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  useMediaQuery,
  FormHelperText,
  Typography,
  Stack,
  Slider,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Brush as BrushIcon,
  FormatBold as BoldIcon,
  FormatItalic as FormatItalicIcon,
} from "@mui/icons-material";
import { MuiColorInput } from "mui-color-input";
import { useEffect, useState } from "react";

import {
  fontWeights,
  MIN_FONT,
  MAX_FONT,
  MIN_POSITION,
  MAX_POSITION,
  GOOGLE_FONTS,
  textTransforms,
  fontStyles,
} from "@/constants";

export default function DesignTabPanel(props) {
  const { setMetadata, formik } = props;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [anchorWeightEl, setAnchorWeightEl] = useState(null);
  const [anchorTransformEl, setAnchorTransformEl] = useState(null);
  const [anchorStyleEl, setAnchorStyleEl] = useState(null);
  const openWeight = Boolean(anchorWeightEl);
  const openTransform = Boolean(anchorTransformEl);
  const openStyle = Boolean(anchorStyleEl);

  const handleWeightClick = (event) => {
    setAnchorWeightEl(event.currentTarget);
  };
  const handleWeightClose = () => {
    setAnchorWeightEl(null);
  };

  const handleTransformClick = (event) => {
    setAnchorTransformEl(event.currentTarget);
  };
  const handleTransformClose = () => {
    setAnchorTransformEl(null);
  };

  const handleStyleClick = (event) => {
    setAnchorStyleEl(event.currentTarget);
  };
  const handleStyleClose = () => {
    setAnchorStyleEl(null);
  };

  useEffect(() => {
    setMetadata(formik.values);
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
              <TextField
                select
                fullWidth
                name="font"
                value={formik.values.font}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={!!formik.touched.font && !!formik.errors.font}
                helperText={formik.touched.font && formik.errors.font}
                label="Font"
                size="small"
                sx={{ mb: 1 }}
              >
                {Array.from(Object.keys(GOOGLE_FONTS)).map((font) => (
                  <MenuItem key={font} value={font}>
                    <Typography
                      fontWeight="medium"
                      variant="h6"
                      sx={{
                        fontFamily: GOOGLE_FONTS[font],
                      }}
                    >
                      {font}
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
              <Stack direction="row" spacing={1}>
                <div>
                  <Button
                    startIcon={<BoldIcon fontSize="small" />}
                    color="inherit"
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 8, p: 1, py: 0 }}
                    aria-controls={openWeight ? "weight-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openWeight ? "true" : undefined}
                    onClick={handleWeightClick}
                  >
                    <Typography
                      variant="caption"
                      fontWeight={formik.values.fontWeight}
                    >
                      {formik.values.fontWeight}
                    </Typography>
                  </Button>
                  <Menu
                    id="weight-menu"
                    anchorEl={anchorWeightEl}
                    open={openWeight}
                    onClose={handleWeightClose}
                    MenuListProps={{
                      "aria-labelledby": "weight-button",
                    }}
                  >
                    {fontWeights.map((fontWeight) => (
                      <MenuItem
                        key={fontWeight}
                        selected={formik.values.fontWeight == fontWeight}
                        onClick={() => {
                          handleWeightClose();
                          formik.setFieldValue("fontWeight", fontWeight);
                        }}
                      >
                        {fontWeight}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <div>
                  <Button
                    startIcon={<BrushIcon fontSize="small" />}
                    color="inherit"
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 8, p: 1, py: 0 }}
                    aria-controls={openTransform ? "transform-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openTransform ? "true" : undefined}
                    onClick={handleTransformClick}
                  >
                    <Typography
                      variant="caption"
                      textTransform={formik.values.textTransform}
                    >
                      {formik.values.textTransform}
                    </Typography>
                  </Button>
                  <Menu
                    id="transform-menu"
                    anchorEl={anchorTransformEl}
                    open={openTransform}
                    onClose={handleTransformClose}
                    MenuListProps={{
                      "aria-labelledby": "transform-button",
                    }}
                  >
                    {textTransforms.map((textTransform) => (
                      <MenuItem
                        key={textTransform}
                        selected={formik.values.textTransform == textTransform}
                        onClick={() => {
                          handleTransformClose();
                          formik.setFieldValue("textTransform", textTransform);
                        }}
                      >
                        {textTransform}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                <div>
                  <Button
                    startIcon={<FormatItalicIcon fontSize="small" />}
                    color="inherit"
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 8, p: 1, py: 0 }}
                    aria-controls={openStyle ? "style-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openStyle ? "true" : undefined}
                    onClick={handleStyleClick}
                  >
                    <Typography
                      variant="caption"
                      fontStyle={formik.values.fontStyle}
                    >
                      {formik.values.fontStyle}
                    </Typography>
                  </Button>
                  <Menu
                    id="style-menu"
                    anchorEl={anchorStyleEl}
                    open={openStyle}
                    onClose={handleStyleClose}
                    MenuListProps={{
                      "aria-labelledby": "style-button",
                    }}
                  >
                    {fontStyles.map((fontStyle) => (
                      <MenuItem
                        key={fontStyle}
                        selected={formik.values.fontStyle == fontStyle}
                        onClick={() => {
                          handleStyleClose();
                          formik.setFieldValue("fontStyle", fontStyle);
                        }}
                      >
                        {fontStyle}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Stack>
            </Box>
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
