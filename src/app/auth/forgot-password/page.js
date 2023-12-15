"use client";

import { Container, Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import JWTForgotPassword from "@/components/auth/jwt-forgot-password";

export default function ForgotPassword() {
  return (
    <>
      <title>Cap Hacker - Forgot your Password</title>
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
