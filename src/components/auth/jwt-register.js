"use client";

import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
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
const handleMouseDownPassword1 = (event) => {
  event.preventDefault();
};

export const JWTRegister = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isMounted = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, loading, setLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      policy: false,
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
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
      policy: Yup.boolean().oneOf(
        [true],
        "You must accept terms and conditions",
      ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const { confirmPassword, policy, submit, ...data } = values;
        setLoading(true);
        await register(data);

        if (isMounted()) {
          const returnUrl = searchParams.get("returnUrl") || "/";
          router.push(returnUrl);
        }
      } catch (err) {
        if (isMounted()) {
          const { message } = err?.response?.data;
          const submit = Array.isArray(message) ? err.message : message;
          helpers.setErrors({
            submit,
          });
          helpers.setStatus({ success: false });
          helpers.setSubmitting(false);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address *"
          margin="dense"
          name="email"
          size="small"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
          sx={{ gridColumn: "span 4" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <UserIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: -1,
            mt: 2,
            gridColumn: "span 4",
          }}
        >
          <Checkbox
            checked={formik.values.policy}
            name="policy"
            onChange={formik.handleChange}
          />
          <Typography color="textSecondary" variant="body2">
            I have read the{" "}
            <Link component="a" href="#">
              Terms and Conditions
            </Link>
          </Typography>
        </Box>
        {Boolean(formik.touched.policy && formik.errors.policy) && (
          <Box sx={{ gridColumn: "span 4" }}>
            <FormHelperText error>{formik.errors.policy}</FormHelperText>
          </Box>
        )}
        {formik.errors.submit && (
          <Box sx={{ mt: 1, gridColumn: "span 4" }}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Box>
        )}
        <Box
          sx={{
            mt: 2,
            gridColumn: "span 4",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            fullWidth
            disabled={formik.isSubmitting || loading}
            size="medium"
            type="submit"
            variant="contained"
            startIcon={
              formik.isSubmitting || loading ? (
                <CircularProgress sx={{ mr: 1 }} color="inherit" size={20} />
              ) : null
            }
          >
            Create
          </Button>
        </Box>
      </Box>
    </form>
  );
};
