"use client";

import { Container, Box, Card, Link, Divider, Typography } from "@mui/material";

import { JWTLogin } from "@/components/auth/jwt-login";
import Logo from "@/components/common/logo";
import GoogleAuthBtn from "@/components/auth/google-auth-btn";

export default function LoginPage() {
  return (
    <>
      <title>SubmagicPro - SignIn</title>
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
            <Typography variant="h5">Welcome back</Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <JWTLogin />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Typography sx={{ mr: 1 }}>Don't have an account?</Typography>
            <Link href="/auth/signup">Sign up</Link>
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
