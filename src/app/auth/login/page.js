"use client";

import { Container, Box, Card, Divider, Typography } from "@mui/material";

import { JWTLogin } from "@/components/auth/jwt-login";
import GoogleAuthBtn from "@/components/auth/google-auth-btn";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <title>Cap Hacker - SignIn</title>
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
          <Link href="/">
            <Image
              className="w-[100px] md:w-[150px]"
              src="/assets/logo.png"
              alt="logo"
              width={150}
              height={150}
              style={{ margin: "0 auto" }}
            />
          </Link>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <Typography variant="h6">Welcome back</Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <JWTLogin />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              my: 2,
            }}
          >
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
