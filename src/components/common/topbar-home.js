"use client";

import {
  useMediaQuery,
  Divider,
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/material/styles";

import Logo from "./logo";

const LinkButton = styled(Button)(() => ({
  color: "ButtonText",
  "&:hover": {
    backgroundColor: "primary.light",
  },
}));

export default function TopbarHome() {
  const isNonMobile = useMediaQuery("(min-width:640px)");

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 100,
        boxShadow: "none",
        width: "100%",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          backgroundColor: "background.paper",
          justifyContent: "space-between",
        }}
      >
        <Logo
          transform={isNonMobile ? "scale(1)" : "scale(0.7)"}
          width={isNonMobile ? "inherit" : "100px"}
        />
        <Box>
          <LinkButton size="small">
            <Link
              href="https://blog.submgic.pro/about/"
              style={{ color: "ButtonText", textDecoration: "none" }}
            >
              About
            </Link>
          </LinkButton>
          <LinkButton size="small">
            <Link
              href="https://blog.submgic.pro/contact/"
              style={{ color: "ButtonText", textDecoration: "none" }}
            >
              Contact
            </Link>
          </LinkButton>
          <LinkButton size="small" variant="contained">
            <Link
              href="/auth/signup"
              style={{ color: "ButtonText", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </LinkButton>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
