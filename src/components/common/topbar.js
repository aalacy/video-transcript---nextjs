"use client";

import Link from "next/link";
import {
  useMediaQuery,
  Divider,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Button,
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Home as HomeIcon,
  Menu as MenuIcon,
  Download as DownloadIcon,
  NavigateNext as NavigateNextIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

import { DRAWER_WIDTH } from "@/constants";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  }),
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
      open={state}
      position="fixed"
      sx={{
        boxShadow: "none",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          width: 1,
          py: 1,
          backgroundColor: "background.paper",
          justifyContent: isNonMobile ? "space-between" : "flex-start",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setState(!state)}
            sx={{ mr: 1 }}
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
              <Tooltip title={isNonMobile ? "" : title}>
                <Typography
                  variant="h6"
                  color="black"
                  sx={{
                    textOverflow: "ellipsis",
                    maxWidth: isNonMobile ? "inherit" : "140px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    wordBreak: "break-all",
                  }}
                >
                  {title}
                </Typography>
              </Tooltip>
            </Breadcrumbs>
          ) : null}
        </Box>
        <Box sx={{ display: handleSave ? "flex" : "none", mr: 1 }}>
          {isNonMobile ? (
            <Button
              onClick={handleSave}
              variant="outlined"
              sx={{ mr: 1 }}
              size="small"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              Save Project
            </Button>
          ) : (
            <IconButton
              color="primary"
              aria-label="save"
              disabled={loading}
              onClick={handleSave}
            >
              {loading ? <CircularProgress size={20} /> : <SaveIcon />}
            </IconButton>
          )}
          {isNonMobile ? (
            <Button
              id="download-button"
              startIcon={loading ? <CircularProgress size={20} /> : null}
              disabled={loading}
              size="small"
              aria-controls={open ? "download-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Download
            </Button>
          ) : (
            <IconButton
              color="primary"
              aria-label="download"
              aria-controls={open ? "download-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              disabled={loading}
              onClick={handleClick}
            >
              {loading ? <CircularProgress size={20} /> : <DownloadIcon />}
            </IconButton>
          )}
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
