"use client";

import Link from "next/link";
import {
  useMediaQuery,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Button,
  Box,
} from "@mui/material";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";

import { DRAWER_WIDTH } from "@/constants";
import { useAuth } from "@/hooks/use-auth";

export default function Topbar({ setState, state, ...props }) {
  const isNonMobile = useMediaQuery("(min-width:640px)");

  const { title } = useAuth();

  const { saveCallback, exportCallback } = props;

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 100,
        boxShadow: "none",
        width: isNonMobile ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: "background.paper",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setState(!state)}
            sx={{ mr: 1, display: { md: "none" } }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon />
            </Link>
            <Typography variant="h6" noWrap component="div" color="black">
              {title}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ display: saveCallback ? "inherit" : "none" }}>
          <Button onClick={saveCallback} variant="outlined" sx={{ mr: 2 }}>
            Save
          </Button>
          <Button onClick={exportCallback} variant="contained">
            Pay & Export
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
