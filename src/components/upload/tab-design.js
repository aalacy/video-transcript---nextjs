'use client'

import {
  Card,
  CardContent,
  Box,
  Button,
  TextField,
  useMediaQuery,
  FormHelperText,
  CircularProgress,
  Typography,
  Stack,
  Slider,
  InputAdornment,
  RadioGroup,
  Radio,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Brush as BrushIcon } from "@mui/icons-material";
import { MuiColorInput } from "mui-color-input";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const fonts = ["Times New Roman", "Arial", "Helvetica Neue", "Poppins"];
const fontWeights = ["Light", "Medium", "Bold"];

const BpIcon = styled("span")(() => ({
  display: "none",
}));

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function DesignTabPanel(props) {
  const { setValues, data } = props;

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = async (values, helpers) => {
    console.log("values", values);
  };

  const initialValues = {
    backgroundColor: "#4d1a7f",
    fontColor: "#4d1a7f",
    font: fonts[0],
    fontWeight: fontWeights[0],
    fontSize: 24,
    position: 100,
  };

  const validationSchema = yup.object().shape({
    backgroundColor: yup.string().required("Required"),
    fontColor: yup.string().required("Required"),
    font: yup.string(),
    fontSize: yup.number().min(11).max(33),
    position: yup.number().min(1).max(500),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    setValues(formik.values);
  }, [formik.values])
  
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
            <RadioGroup
              aria-labelledby="font"
              name="font"
              value={formik.values.font}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{ gridColumn: "span 4" }}
            >
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 2",
                  },
                  columnGap: "30px",
                  rowGap: 1,
                  width: 1,
                }}
              >
                {fonts.map((font) => (
                  <FormControlLabel
                    key={font}
                    value={font}
                    control={<BpRadio />}
                    label={
                      <Box sx={{ width: 1, textAlign: "center" }}>
                        <Typography
                          fontWeight="medium"
                          variant="h6"
                          sx={{
                            fontFamily: font,
                            border: 1,
                            p: 1,
                            borderRadius: 2,
                            width: 1,
                            textAlign: "center",
                            mb: 1,
                            color:
                              font === formik.values.font
                                ? "secondary.main"
                                : "inherit",
                          }}
                        >
                          {font}
                        </Typography>
                        <Button
                          id="basic-button"
                          startIcon={<BrushIcon fontSize="small" />}
                          color="inherit"
                          size="small"
                          variant="outlined"
                          sx={{ borderRadius: 8, p: 1, py: 0 }}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <Typography variant="caption">Custom</Typography>
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          {fontWeights.map((fontWeight) => (
                            <MenuItem
                              key={fontWeight}
                              selected={formik.values.fontWeight == fontWeight}
                              onClick={() => {
                                handleClose();
                                formik.setFieldValue("fontWeight", fontWeight);
                              }}
                            >
                              {fontWeight}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Box>
                    }
                    sx={{
                      gridColumn: "span 1",
                      width: 1,
                      "& > .MuiFormControlLabel-label": { width: 1 },
                    }}
                  />
                ))}
              </Box>
            </RadioGroup>
            <MuiColorInput
              fullWidth
              size="small"
              format="hex"
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
                formik.touched.backgroundColor &&
                formik.errors.backgroundColor
              }
              sx={{ gridColumn: "span 2" }}
            />
            <MuiColorInput
              fullWidth
              size="small"
              format="hex"
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
                    <InputAdornment position="end">px</InputAdornment>
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
                min={1}
                max={500}
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
                min={11}
                max={33}
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
          <Box display="flex" justifyContent="end" mt="4em" gap={2}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting && (
                <CircularProgress sx={{ mr: 1 }} color="inherit" size={20} />
              )}{" "}
              Upload
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
