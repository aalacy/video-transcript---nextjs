"use client";

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  FormHelperText,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";

import { FileService } from "@/service/file-service";
import { LanguageCode } from "@/constants";
import { FileDropzone } from "@/components/file-dropzone";
import { useState } from "react";
import { MuiColorInput } from "mui-color-input";

const client = new FileService();

export default function HomePage() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [files, setFiles] = useState([]);
  const [name, setName] = useState();
  const [loading, setLoading] = useState();

  const initialValues = {
    language: LanguageCode.English,
  };

  const validationSchema = yup.object().shape({
    language: yup.string(),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const { data } = await client.generate({ name, ...values});
      toast.success(data.message);
      setName("")
      setFiles([])
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    } finally {
      setLoading(false)
    }
  };

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path)
    );
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const onUpload = async () => {
    setName("");
    try {
      setLoading(true)
      const { data } = await client.upload({file: files[0]});
      setName(data.name);
      toast.success(data.message);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <title>Upload</title>

      <form onSubmit={formik.handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
            mb: 2,
          }}
        >
          <TextField
            fullWidth
            select
            type="text"
            size="small"
            label="* Language (97 options)"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.language}
            name="language"
            error={!!formik.touched.language && !!formik.errors.language}
            helperText={formik.touched.language && formik.errors.language}
            sx={{ gridColumn: "span 2" }}
          >
            {Object.keys(LanguageCode).map((key) => (
              <MenuItem key={key} value={LanguageCode[key]}>
                {key}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <FileDropzone
          accept="audio/*, video/*"
          files={files}
          maxFiles={1}
          maxSize={100 * 1024 * 1024}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          onUpload={onUpload}
          loading={loading}
        />
        <Box display="flex" justifyContent="center" mt="4em" gap={2}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            disabled={!name || formik.isSubmitting || loading}
            startIcon={formik.isSubmitting ?
              <CircularProgress sx={{ mr: 1 }} color="warning" size={20} />
            : null}
          >
            Generate
          </Button>
        </Box>
      </form>
    </>
  );
}
