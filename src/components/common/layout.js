"use client";

import {
  Box,
  useMediaQuery,
  Container as MuiContainer,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, Suspense } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "./global.css";

import {
  DRAWER_WIDTH,
  JOB_GENERATE_VIDEO,
  JOB_MONSTER_TRANSCRIPTION,
} from "@/constants";
import Topbar from "@/components/common/topbar";
import Sidebar from "@/components/common/sidebar";
import { useAuth } from "@/hooks/use-auth";
import ConfirmDialog from "./confirm";
import { downloadMedia } from "@/utils";
import TopbarHome from "./topbar-home";
import Footer from "./footer";

const socket = io(process.env.NEXT_PUBLIC_API_URL);
socket.on("connect", () => {
  console.log("socket connected", socket.id);
});
socket.on("connect_error", () => {
  setTimeout(() => socket.connect(), 5000);
});
socket.on("disconnect", () => console.error("server disconnected"));

const Container = styled(MuiContainer, {
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

export default function RootLayout({ children }) {
  const isNonMobile = useMediaQuery("(min-width:640px)");

  const [state, setState] = useState(true);

  const {
    user,
    setFileName,
    setLoading,
    setProgress,
    confirmMessage,
    isAuthenticated,
    setVisitorId,
    visitorId,
    setShowDownload,
    ...props
  } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const hasLayout = useMemo(() => {
    return !pathname.includes("/auth") && isAuthenticated;
  }, [pathname, user]);

  const hasHomeLayout = useMemo(() => {
    return !pathname.includes("/auth") && !isAuthenticated;
  }, [pathname, user]);

  useEffect(() => {
    setState(isNonMobile);
  }, [isNonMobile]);

  useEffect(() => {
    socket.on("monster", async (data) => {
      const {
        status,
        file,
        jobName,
        message,
        userId,
        percent,
        error,
        ...other
      } = data;
      const isMine = userId
        ? user?.id == userId
        : other.visitorId === visitorId;
      if (isMine) {
        if (status === "progress") {
          setProgress({ percent, message });
          setShowDownload(false);
        } else if (status === "completed") {
          if (
            [JOB_MONSTER_TRANSCRIPTION, JOB_GENERATE_VIDEO].includes(jobName)
          ) {
            setLoading(false);
            setProgress({ percent: 0, message: "", file });
            if (jobName === JOB_MONSTER_TRANSCRIPTION) {
              toast.success(message);
              if (userId) router.push(`/upload/${file.id}`);
              if (other.visitorId && !userId) {
                setShowDownload(true);
                // await client.download({ visitorId });
              }
            } else if (jobName === JOB_GENERATE_VIDEO) {
              const fileName = file.fileName.slice(0, -4);
              downloadMedia(`${fileName}-subtitled.${file.ext}`, file.output);
              // if (!userId) saveText(`${fileName}-sutitle.vtt`, file.vtt);
              toast.success("Successfully downloaded a video");
            }
          }
        } else if (status === "failed") {
          setLoading(false);
          setProgress({ percent: 0, message: "", file });
          toast.error(`Something wrong happened. Please try it again.`);
        }
      }
    });
    return () => socket.removeAllListeners();
  }, [pathname, user, visitorId, socket]);

  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();
      const visitor = await fp.get();
      setVisitorId(visitor.visitorId);
    };

    if (!visitorId) setFp();
  }, [pathname, user]);

  return (
    <Suspense>
      {hasLayout ? (
        <>
          <Topbar setState={setState} state={state} {...props} />
          <Sidebar setState={setState} state={state} />
        </>
      ) : null}
      {hasHomeLayout ? <TopbarHome /> : null}
      <Container
        maxWidth="xl"
        sx={{ py: 2 }}
        open={isAuthenticated ? state : false}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: hasLayout || hasHomeLayout ? ["88px", "56px", "64px"] : 0,
            mb: 2,
          }}
        >
          {children}
        </Box>
        <Divider />
        <Footer hasLayout={hasLayout} />
      </Container>
      <ConfirmDialog {...confirmMessage} />
    </Suspense>
  );
}
