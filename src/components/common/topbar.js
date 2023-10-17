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
  CircularProgress,
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

  const { title, loading } = useAuth();

  const { handleSave, handleExport } = props;

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
        variant="dense"
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
            sx={{ mr: 1, display: isNonMobile ? "none" : "inherit" }}
          >
            <MenuIcon color="primary" />
          </IconButton>
          {title ? (
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link underline="hover" color="inherit" href="/">
                <HomeIcon />
              </Link>
              <Typography variant="h6" color="black">
                {title}
              </Typography>
            </Breadcrumbs>
          ) : null}
        </Box>
        <Box sx={{ display: handleSave ? "inherit" : "none" }}>
          <Button
            onClick={handleSave}
            variant="outlined"
            sx={{ mr: 2 }}
            size="small"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Save Project
          </Button>
          <Button
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={loading}
            onClick={handleExport}
            variant="contained"
            size="small"
          >
            Download
          </Button>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
