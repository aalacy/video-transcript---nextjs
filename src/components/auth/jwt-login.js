"use client";

import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  EmailOutlined as UserIcon,
  VisibilityOutlined as EyeIcon,
  VisibilityOffOutlined as EyeOffIcon,
} from "@mui/icons-material";

import { useAuth } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};

export const JWTLogin = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      shouldRememberMe: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true);
        await login(values.email, values.password, values.shouldRememberMe);

        if (isMounted()) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "login",
            authentication_method: "email",
          });
          const returnUrl = searchParams.get("returnUrl") || "/";
          router.push(returnUrl);
        }
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
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password"
        margin="normal"
        name="password"
        size="small"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Link
        color="secondary"
        href="/auth/forgot-password"
        sx={{ mt: 2 }}
        variant="body2"
      >
        Forgot Password?
      </Link>
      <Box
        sx={{
          mt: 2,
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
    </form>
  );
};
