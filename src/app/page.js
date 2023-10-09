"use client";

import {
  Box,
  Button,
  TextField,
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
import { useEffect, useState } from "react";

const client = new FileService();

export default function HomePage() {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState();
  const [loading, setLoading] = useState();
  const [fileError, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const initialValues = {
    lang: LanguageCode.English,
  };

  const validationSchema = yup.object().shape({
    lang: yup.string(),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await client.generate({ name, ...values });
      toast.success(data.message);
      setName("");
      setFiles([]);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (newFiles) => {
    setFiles(() => [...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_file) => _file.path !== file.path),
    );
    setLoaded(false);
    setName("");
  };

  const handleRemoveAll = () => {
    setFiles([]);
    setLoaded(false);
    setName("");
  };

  const onUpload = async () => {
    setName("");
    setLoaded(false);
    try {
      setLoading(true);
      const { data } = await client.upload({ file: files[0] });
      setName(data.name);
      toast.success(data.message);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!fileError) return;
    setError(false);
    toast.error(
      "Video width exceeds 1080px limit, please resize it. (TikTok/Reels/Short format only)",
    );
  }, [fileError]);

  return (
    <>
      <title>Upload</title>

      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ maxWidth: "sm", mb: 2, width: 1 }}>
            <TextField
              select
              fullWidth
              type="text"
              size="small"
              label="* Language (97 options)"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lang}
              name="lang"
              error={!!formik.touched.lang && !!formik.errors.lang}
              helperText={formik.touched.lang && formik.errors.lang}
            >
              {Object.keys(LanguageCode).map((key) => (
                <MenuItem key={key} value={LanguageCode[key]}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        {formik.errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <FileDropzone
          accept={{ "video/*": [".mp4", ".mov"] }}
          files={files}
          setFiles={setFiles}
          maxFiles={1}
          maxSize={100 * 1024 * 1024}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
          onUpload={onUpload}
          loading={loading}
          setError={setError}
          loaded={loaded}
          setLoaded={setLoaded}
        />
        <Box display="flex" justifyContent="center" mt="4em" gap={2}>
          <Button
            type="submit"
            size="large"
            variant="contained"
            disabled={!name || formik.isSubmitting || loading}
            startIcon={
              formik.isSubmitting ? (
                <CircularProgress sx={{ mr: 1 }} color="warning" size={20} />
              ) : null
            }
          >
            Generate
          </Button>
        </Box>
      </form>
    </>
  );
}
