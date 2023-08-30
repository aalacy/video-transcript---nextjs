"use client"
import * as React from 'react';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  TextField,
  useMediaQuery,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

import { Formik, Form } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import { APIClient } from '@/service/client'

const client = new APIClient()

export default function HomePage() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = React.useState("a92fac80-bf22-4102-8375-e90b2b770b6c")

  const handleFormSubmit = async (values, helpers) => {
    try {
      await submitForm({ ...values });
      toast.success("Successfully created.");
    } catch (err) {
      const { message } = err?.response?.data;
      const submit = Array.isArray(message) ? err.message : message;
      helpers.setErrors({ submit });
    }
  };
  const initialValues = {
    language: "en-US",
    backgroundColour: "0x4d1a7f",
    fontColour: "0x4d1a7f",
    font: "DejaVu Serif",
    fontSize: 50,
    alignment: 5,
    width: 720,
    height: 1280,
    file: ""
  };
  const checkoutSchema = yup.object().shape({
    language: yup.string(),
    backgroundColour: yup.string(),
    fontColour: yup.string(),
    font: yup.string(),
    font_size: yup.number(),
    width: yup.number(),
    alignment: yup.number(),
    height: yup.number(),
  });

  const submitForm = async (values) => {
    try {
      setName('')
      const { data } = await client.upload(values);
      toast.success(data.message);
      setName(data.processId)
    } catch(error) {
      toast.error(error?.message || 'Something wrong happened.')
    }
  };

  const downloadFile = async () => {
    const { data } = await client.download(name);
    const a = document.createElement('a')
    a.href = data.output;
    a.click()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <div>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Hello 👋</AlertTitle>
          This app generates the video with transcript from audio file.
        </Alert>
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
        }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Language"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.language}
                name="language"
                error={!!touched.language && !!errors.language}
                helperText={touched.language && errors.language}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Background Color"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.backgroundColour}
                name="backgroundColour"
                error={!!touched.backgroundColour && !!errors.backgroundColour}
                helperText={touched.backgroundColour && errors.backgroundColour}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Font Color"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fontColour}
                name="fontColour"
                error={!!touched.fontColour && !!errors.fontColour}
                helperText={touched.fontColour && errors.fontColour}
                sx={{ gridColumn: "span 2" }}
              />
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
                sx={{ gridColumn: "span 2" }}
              />
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
                sx={{ gridColumn: "span 2" }}
              />
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

              <input 
                name="file" 
                type="file" 
                onBlur={handleBlur}  
                onChange={(event) => {
                  setTouched({
                    ...touched,
                    file: true,
                  });
                  setFieldValue(
                    "file",
                    event.target.files[0]
                  );
                }}
                error={!!touched.file && !!errors.file}
                helperText={touched.file && errors.file}
                sx={{ gridColumn: "span 4" }}
              />
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
                disabled={!!!values.file}
              >
                {isSubmitting && (
                  <CircularProgress sx={{ mr: 1 }} color="inherit" size={20} />
                )}{" "}
                Upload
              </Button>
              <Button variant="contained" onClick={downloadFile}>Download</Button>
            </Box>
          </Form>
        )}
      </Formik>

        </div>      
    </Box>
  );
}
