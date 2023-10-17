"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  InputAdornment,
  CircularProgress,
  Link,
} from "@mui/material";
import { EmailOutlined as UserIcon } from "@mui/icons-material";

import { useAuth } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
import toast from "react-hot-toast";

export default function JWTForgotPassword(props) {
  const { setLoading, loading, passwordRecovery } = useAuth();
  const isMounted = useMounted();

  const formik = useFormik({
    initialValues: {
      email: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true);
        await passwordRecovery(values.email);
        toast.success("Successfully sent an recovery email.");
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({
            submit: err?.response?.data?.message || err.message,
          });
          helpers.setSubmitting(false);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        autoFocus
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        helperText={formik.touched.email && formik.errors.email}
        label="Email"
        margin="normal"
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="email"
        size="small"
        value={formik.values.email}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <UserIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}

      <Box
        sx={{
          my: 2,
        }}
      >
        <Button
          disabled={formik.isSubmitting || loading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          startIcon={
            formik.isSubmitting || loading ? (
              <CircularProgress sx={{ mr: 1 }} color="inherit" size={20} />
            ) : null
          }
        >
          Continue
        </Button>
      </Box>
      <Link color="primary" href="/auth/login" variant="body2">
        Already have an account?
      </Link>
    </form>
  );
}
