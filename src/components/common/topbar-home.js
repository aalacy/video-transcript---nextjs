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
  fontWeight: "500",
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
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          py: 1,
          width: 1,
          backgroundColor: "background.paper",
          justifyContent: "space-between",
        }}
      >
        <Logo
          size={isNonMobile ? "medium" : "small"}
          width={isNonMobile ? "auto" : "100px"}
        />
        <Box>
          <LinkButton size="small">
            <Link
              href="https://blog.submgic.pro/about/"
              style={{ color: "ButtonText", textDecoration: "none" }}
              target="_blank"
            >
              About
            </Link>
          </LinkButton>
          <LinkButton size="small">
            <Link
              href="https://blog.submgic.pro/contact/"
              style={{ color: "ButtonText", textDecoration: "none" }}
              target="_blank"
            >
              Contact
            </Link>
          </LinkButton>
          <LinkButton size="small" variant="contained">
            <Link
              href="/auth/signup"
              style={{ color: "White", textDecoration: "none" }}
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
