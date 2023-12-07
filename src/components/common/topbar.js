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
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  Download as DownloadIcon,
  NavigateNext as NavigateNextIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";

import { DRAWER_WIDTH } from "@/constants";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import TopBanner from "./top-banner";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function Topbar({ setState, state, ...props }) {
  const isNonMobile = useMediaQuery("(min-width:640px)");

  const { title, loading } = useAuth();

  const { handleSave, handleExport } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 100,
        boxShadow: "none",
        bgcolor: "background.paper",
        width: isNonMobile ? `calc(100% - ${DRAWER_WIDTH}px)` : 1,
      }}
    >
      <TopBanner />
      <Toolbar
        variant="dense"
        sx={{
          width: 1,
          py: 1,
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
            id="download-button"
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={loading}
            size="small"
            aria-controls={open ? "download-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Download
          </Button>
          <StyledMenu
            id="download-menu"
            MenuListProps={{
              "aria-labelledby": "download-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleExport("Video");
                handleClose();
              }}
              disableRipple
            >
              <DownloadIcon />
              Video
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                handleExport("Vtt");
                handleClose();
              }}
              disableRipple
            >
              <DownloadIcon />
              Srt
            </MenuItem>
          </StyledMenu>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
