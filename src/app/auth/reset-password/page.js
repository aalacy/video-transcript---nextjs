"use client";

import { Container, Box, Card, Typography } from "@mui/material";

import Logo from "@/components/common/logo";
import JWTResetPassword from "@/components/auth/jwt-reset-password";
import Link from "next/link";

export default function ResetPassword() {
  return (
    <>
      <title>Cap Hacker - Reset your Password</title>
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
            <Typography variant="h6">Reset your password</Typography>
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
