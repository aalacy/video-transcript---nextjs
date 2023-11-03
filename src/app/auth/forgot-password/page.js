"use client";

import { Container, Box, Card, Typography } from "@mui/material";

import Logo from "@/components/common/logo";
import JWTForgotPassword from "@/components/auth/jwt-forgot-password";

export default function ForgotPassword() {
  return (
    <>
      <title>SubmagicPro - Forgot your Password</title>
      <meta name="robots" content="noindex" />
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
            <Typography variant="h6">Forgot your password?</Typography>
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              Enter your email address and we will send you instructions to
              reset your password
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <JWTForgotPassword />
          </Box>
        </Card>
      </Container>
    </>
  );
}
