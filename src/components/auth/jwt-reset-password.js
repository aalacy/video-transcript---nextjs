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
  IconButton,
} from "@mui/material";
import {
  VisibilityOutlined as EyeIcon,
  VisibilityOffOutlined as EyeOffIcon,
} from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
import toast from "react-hot-toast";
import { useState } from "react";

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
const handleMouseDownPassword1 = (event) => {
  event.preventDefault();
};

export default function JWTResetPassword(props) {
  const { setLoading, loading, passwordReset } = useAuth();
  const isMounted = useMounted();
  const searchParams = useSearchParams();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      submit: null,
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8)
        .max(255)
        .required("Password is required")
        .matches(
          /^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Number and One Special Case Character",
        ),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true);
        await passwordReset(values.password, searchParams.get("token"));
        toast.success("Successfully Updated Password.");
        router.push("/auth/login");
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
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Password *"
        margin="dense"
        name="password"
        size="small"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        sx={{ gridColumn: "span 4" }}
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
      <TextField
        error={Boolean(
          formik.touched.confirmPassword && formik.errors.confirmPassword,
        )}
        fullWidth
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        label="Confirm Password *"
        margin="dense"
        name="confirmPassword"
        size="small"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type={showPassword1 ? "text" : "password"}
        value={formik.values.confirmPassword}
        sx={{ gridColumn: "span 4", borderRadius: "28%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword1}
                onMouseDown={handleMouseDownPassword1}
                edge="end"
              >
                {showPassword1 ? <EyeOffIcon /> : <EyeIcon />}
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
    </form>
  );
}
