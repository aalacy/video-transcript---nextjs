"use client";

import { useMediaQuery, Box } from "@mui/material";

import { AuthProvider } from "@/context/jwt-context";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { DRAWER_WIDTH } from "@/constants";
import Topbar from "@/components/common/topbar";
import Sidebar from "@/components/common/sidebar";

export default function RootLayout({ children, ...props }) {
  const [state, setState] = useState(true);

  const isNonMobile = useMediaQuery("(min-width:640px)");

  const pathname = usePathname();

  const hasLayout = useMemo(() => {
    return !pathname.includes("/auth");
  }, [pathname]);

  return (
    <AuthProvider>
      {hasLayout ? (
        <>
          <Topbar setState={setState} state={state} {...props} />
          <Sidebar setState={setState} state={state} />
        </>
      ) : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: ["48px", "56px", "64px"],
          ml: isNonMobile && hasLayout ? `${DRAWER_WIDTH}px` : 0,
          p: 3,
        }}
      >
        {children}
      </Box>
    </AuthProvider>
  );
}
