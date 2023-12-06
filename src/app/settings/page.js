"use client";

import { Container, Box, Card, Typography } from "@mui/material";

import Logo from "@/components/common/logo";
import JWTResetPassword from "@/components/auth/jwt-reset-password";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";
import { gtm } from "@/utils/gtm";

export default function SettingsPage() {
  const { setTitleInfo } = useAuth();

  useEffect(() => {
    setTitleInfo({ title: "Settings" });
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <title>Cap Hacker - Settings</title>
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
          </Box>
        </Card>
      </Container>
    </>
  );
}
