"use client";

import * as React from "react";
import { io } from "socket.io-client";
import {
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
  MenuItem,
} from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import { Formik, Form } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import { AuthService } from "@/service/auth-service";
import { LanguageCode } from "@/constants";

const client = new AuthService();

export default function HomePage() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = React.useState();
  const [status, setStatus] = React.useState(false);

  //   React.useEffect(()=>{
  //     const socket = io(process.env.NEXT_PUBLIC_API_URL)
  //     socket.on('connect', ()=>console.log('connect ', socket.id))
  //     socket.on('connect_error', ()=>{
  //       setTimeout(()=>socket.connect(),5000)
  //     })
  //    socket.on('monster', (data)=> {
  //     const { status, processId } = data;
  //     console.log('[socket] ', data)
  //     if (status === 'completed') {
  //       setName(processId)
  //       setStatus(true)
  //       toast.success('Conversion Completed!')
  //     }
  //    })
  //    socket.on('disconnect',()=> console.error('server disconnected'))
  //  },[])

  const handleFormSubmit = async (values, helpers) => {
    await submitForm({ ...values });
  };

  const initialValues = {
    language: LanguageCode.English,
    backgroundColor: "#4d1a7f",
    fontColor: "#4d1a7f",
    font: "DejaVu Serif",
    fontSize: 24,
    alignment: 5,
    width: 720,
    height: 1280,
    file: "",
  };

  const checkoutSchema = yup.object().shape({
    language: yup.string(),
    backgroundColor: yup.string().required("Required"),
    fontColor: yup.string().required("Required"),
    font: yup.string(),
    fontSize: yup.number().min(11).max(46),
    alignment: yup.number().min(1).max(10),
    width: yup.number().min(426).max(3840), // min: 426x240, max: 3840×2160
    height: yup.number().min(240).max(2160),
  });

  const submitForm = async (values) => {
    try {
      const { data } = await client.upload(values);
      toast.success(data.message);
      setName(data.processId);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    }
  };

  const downloadFile = async () => {
    const { data } = await client.download(name);
    const a = document.createElement("a");
    a.href = data.output;
    a.click();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <div>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            setFieldValue,
            setTouched,
            isSubmitting,
          }) => {
            return (
              <Form>
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
                  <TextField
                    fullWidth
                    select
                    type="text"
                    size="small"
                    label="* Language (97 options)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.language}
                    name="language"
                    error={!!touched.language && !!errors.language}
                    helperText={touched.language && errors.language}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {Object.keys(LanguageCode).map((key) => (
                      <MenuItem key={key} value={LanguageCode[key]}>
                        {key}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    label="Font"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.font}
                    name="font"
                    error={!!touched.font && !!errors.font}
                    helperText={touched.font && errors.font}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <MuiColorInput
                    fullWidth
                    size="small"
                    format="hex"
                    name="backgroundColor"
                    label="Background Color"
                    value={values.backgroundColor}
                    onChange={(color) =>
                      setFieldValue("backgroundColor", color)
                    }
                    error={
                      !!touched.backgroundColor && !!errors.backgroundColor
                    }
                    helperText={
                      touched.backgroundColor && errors.backgroundColor
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                  <MuiColorInput
                    fullWidth
                    size="small"
                    format="hex"
                    name="fontColor"
                    label="Font Color"
                    value={values.fontColor}
                    onChange={(color) => setFieldValue("fontColor", color)}
                    error={!!touched.fontColor && !!errors.fontColor}
                    helperText={touched.fontColor && errors.fontColor}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Stack sx={{ gridColumn: "span 2" }}>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      label="Alignment"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.alignment}
                      name="alignment"
                      error={!!touched.alignment && !!errors.alignment}
                      helperText={touched.alignment && errors.alignment}
                    />
                    <Slider
                      value={
                        typeof values.alignment === "number"
                          ? values.alignment
                          : 0
                      }
                      onChange={(event, value) =>
                        setFieldValue("alignment", value)
                      }
                      aria-labelledby="input-slider"
                      min={1}
                      max={10}
                    />
                  </Stack>
                  <Stack sx={{ gridColumn: "span 2" }}>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      label="Font Size"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fontSize}
                      name="fontSize"
                      error={!!touched.fontSize && !!errors.fontSize}
                      helperText={touched.fontSize && errors.fontSize}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">px</InputAdornment>
                        ),
                      }}
                    />
                    <Slider
                      value={
                        typeof values.fontSize === "number"
                          ? values.fontSize
                          : 0
                      }
                      onChange={(event, value) =>
                        setFieldValue("fontSize", value)
                      }
                      aria-labelledby="input-slider"
                      min={11}
                      max={46}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    label="Width"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.width}
                    name="width"
                    error={!!touched.width && !!errors.width}
                    helperText={touched.width && errors.width}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    label="Height"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.height}
                    name="height"
                    error={!!touched.height && !!errors.height}
                    helperText={touched.height && errors.height}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <Box>
                    <Typography>Please upload a video/audio file</Typography>
                    <input
                      name="file"
                      type="file"
                      onBlur={handleBlur}
                      onChange={(event) => {
                        setName("");
                        setTouched({
                          ...touched,
                          file: true,
                        });
                        setFieldValue("file", event.target.files[0]);
                      }}
                      error={!!touched.file && !!errors.file}
                      helperText={touched.file && errors.file}
                      sx={{ gridColumn: "span 4", width: "100%" }}
                      accept=".m4a, .mov, .mp3, .mp4, .mpeg, .mpga, .wav, .webm, .ogg"
                    />
                  </Box>
                </Box>
                {errors.submit && (
                  <Box sx={{ mt: 3 }}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
                <Box display="flex" justifyContent="end" mt="4em" gap={2}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={!!!values.file || isSubmitting}
                  >
                    {isSubmitting && (
                      <CircularProgress
                        sx={{ mr: 1 }}
                        color="inherit"
                        size={20}
                      />
                    )}{" "}
                    Upload
                  </Button>
                  <Button
                    variant="contained"
                    onClick={downloadFile}
                    disabled={!!!name || !status}
                  >
                    Download
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Box>
  );
}
