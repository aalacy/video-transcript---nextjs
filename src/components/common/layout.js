"use client";

import { useMediaQuery, Box, Container, Divider } from "@mui/material";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import {
  DRAWER_WIDTH,
  JOB_GENERATE_VIDEO,
  JOB_MONSTER_TRANSCRIPTION,
} from "@/constants";
import Topbar from "@/components/common/topbar";
import Sidebar from "@/components/common/sidebar";
import { useAuth } from "@/hooks/use-auth";
import ConfirmDialog from "./confirm";
import { downloadMedia, saveText } from "@/utils";
import TopbarHome from "./topbar-home";
import Footer from "./footer";
import { FileService } from "@/service/file-service";

const socket = io(process.env.NEXT_PUBLIC_API_URL);
socket.on("connect", () => {
  console.log("socket connected", socket.id);
});
socket.on("connect_error", () => {
  setTimeout(() => socket.connect(), 5000);
});
socket.on("disconnect", () => console.error("server disconnected"));

const client = new FileService();

export default function RootLayout({ children }) {
  const [state, setState] = useState(true);

  const isNonMobile = useMediaQuery("(min-width:640px)");

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
              saveText(`${fileName}-sutitle.vtt`, file.vtt);
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
      const { visitorId } = await fp.get();
      setVisitorId(visitorId);
    };

    setFp();
  }, [pathname, user]);

  return (
    <>
      {hasLayout ? (
        <>
          <Topbar setState={setState} state={state} {...props} />
          <Sidebar setState={setState} state={state} />
        </>
      ) : null}
      {hasHomeLayout ? <TopbarHome /> : null}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: hasLayout || hasHomeLayout ? ["48px", "56px", "64px"] : 0,
            ml: isNonMobile && hasLayout ? `${DRAWER_WIDTH}px` : 0,
            minHeight: 300,
            mb: 2,
          }}
        >
          {children}
        </Box>
        <Divider />
        <Footer hasLayout={hasLayout} />
      </Container>
      <ConfirmDialog {...confirmMessage} />
    </>
  );
}
