"use client";

import {
  useMediaQuery,
  Divider,
  AppBar,
  Toolbar,
  Button,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/use-auth";
import Logo from "./logo";
import { FileService } from "@/service/file-service";
import { Download as DownloadIcon } from "@mui/icons-material";

const client = new FileService();

export default function TopbarHome({ ...props }) {
  const { showDownload } = props;
  const isNonMobile = useMediaQuery("(min-width:640px)");

  const { visitorId, loading, setLoading } = useAuth();

  const handleExport = async () => {
    try {
      setLoading(true);
      await client.download({ visitorId });
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          <IconButton
            startIcon={loading ? <CircularProgress size={20} /> : null}
            disabled={loading}
            onClick={handleExport}
            size="small"
            color="success"
            sx={{
              display: showDownload ? "inline-flex" : "none",
              ml: 1,
            }}
          >
            <Tooltip title="Download video">
              <DownloadIcon />
            </Tooltip>
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
}
