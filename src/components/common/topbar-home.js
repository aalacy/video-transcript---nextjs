"use client";

import {
  useMediaQuery,
  Divider,
  AppBar,
  Toolbar,
  Button,
  Box,
} from "@mui/material";

import Logo from "./logo";

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
          <Button size="small" href="#about">
            About
          </Button>
          <Button size="small">Contact</Button>
          <Button href="/auth/signup" size="small" variant="contained">
            Sign up
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
