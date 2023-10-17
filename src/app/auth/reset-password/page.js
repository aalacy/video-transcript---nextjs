"use client";

import { Container, Box, Card, Typography, Link } from "@mui/material";

import Logo from "@/components/common/logo";
import JWTResetPassword from "@/components/auth/jwt-reset-password";

export default function ResetPassword() {
  return (
    <>
      <title>Reset your Password</title>
      <Container
        fixed
        maxWidth="xs"
        sx={{
          py: {
            xs: "30px",
            md: "60px",
          },
        }}
      >
        <Card elevation={16} sx={{ p: 4, py: "30px" }}>
          <Logo />
          <Box
            sx={{
              textAlign: "center",
              my: 2,
            }}
          >
            <Typography variant="h5">Reset your password</Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <JWTResetPassword />
            <Link color="primary" href="/auth/login" variant="body2">
              Already have an account?
            </Link>
          </Box>
        </Card>
      </Container>
    </>
  );
}
