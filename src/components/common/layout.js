"use client";

import { useMediaQuery, Box, Container } from "@mui/material";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

import {
  DRAWER_WIDTH,
  JOB_FILE_UPLOAD,
  JOB_GENERATE_VIDEO,
  JOB_MONSTER_TRANSCRIPTION,
} from "@/constants";
import Topbar from "@/components/common/topbar";
import Sidebar from "@/components/common/sidebar";
import { useAuth } from "@/hooks/use-auth";
import ConfirmDialog from "./confirm";
import { downloadMedia } from "@/utils";

const socket = io(process.env.NEXT_PUBLIC_API_URL);
socket.on("connect", () => console.log("connect ", socket.id));
socket.on("connect_error", () => {
  setTimeout(() => socket.connect(), 5000);
});
socket.on("disconnect", () => console.error("server disconnected"));

export default function RootLayout({ children }) {
  const [state, setState] = useState(true);

  const isNonMobile = useMediaQuery("(min-width:640px)");

  const {
    user,
    setFileName,
    setLoading,
    setProgress,
    confirmMessage,
    ...props
  } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  const hasLayout = useMemo(() => {
    return !pathname.includes("/auth");
  }, [pathname]);

  useEffect(() => {
    socket.on("monster", (data) => {
      const { status, file, jobName, message, userId, percent } = data;
      if (user?.id == userId) {
        if (status === "progress") {
          setProgress({ percent, message });
        } else if (status === "completed") {
          if (
            [JOB_MONSTER_TRANSCRIPTION, JOB_GENERATE_VIDEO].includes(jobName)
          ) {
            setLoading(false);
            setProgress({ percent: 0, message: "" });
            if (jobName === JOB_MONSTER_TRANSCRIPTION) {
              toast.success(message);
              router.push(`/upload/${file.id}`);
            } else if (jobName === JOB_GENERATE_VIDEO) {
              downloadMedia(
                `${file.fileName.substr(0, -4)}-subtitled.${file.ext}`,
                file.output,
              );
              toast.success("Successfully downloaded a video");
            }
          }
        }
      }
    });
    return () => socket.removeAllListeners();
  }, [pathname, user]);

  return (
    <>
      {hasLayout ? (
        <>
          <Topbar setState={setState} state={state} {...props} />
          <Sidebar setState={setState} state={state} />
        </>
      ) : null}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: hasLayout ? ["48px", "56px", "64px"] : 0,
            ml: isNonMobile && hasLayout ? `${DRAWER_WIDTH}px` : 0,
          }}
        >
          {children}
        </Box>
      </Container>
      <ConfirmDialog {...confirmMessage} />
    </>
  );
}
