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
  Link,
} from "@mui/material";
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
  const { login } = useAuth();
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
        await login(values.email, values.password, values.shouldRememberMe);

        if (isMounted()) {
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
        href="/auth/password-recovery"
        sx={{ mt: 1 }}
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
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {formik.isSubmitting && (
            <CircularProgress sx={{ mr: 1 }} color="inherit" size={20} />
          )}{" "}
          Continue
        </Button>
      </Box>
    </form>
  );
};
