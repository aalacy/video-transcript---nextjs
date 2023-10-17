"use client";

import * as React from "react";
import { Container, Box, Card, Link, Divider, Typography } from "@mui/material";

import Logo from "@/components/common/logo";
import { JWTRegister } from "@/components/auth/jwt-register";
import GoogleAuthBtn from "@/components/auth/google-auth-btn";

export default function SignupPage() {
  return (
    <>
      <title>SignUp</title>
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
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <Typography variant="h5">Create your account</Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <JWTRegister />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link href="/auth/login">Log in</Link>
          </Box>
          <Divider sx={{ my: 3 }}>OR</Divider>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleAuthBtn />
          </Box>
        </Card>
      </Container>
    </>
  );
}
