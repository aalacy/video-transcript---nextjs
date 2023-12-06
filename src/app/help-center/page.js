"use client";

import { useEffect } from "react";

import Faq from "@/components/home/faq";
import { useAuth } from "@/hooks/use-auth";
import { gtm } from "@/utils/gtm";
import { Box } from "@mui/material";

export default function FaqPage() {
  const { setTitleInfo } = useAuth();

  useEffect(() => {
    setTitleInfo({ title: "Help Center" });
    gtm.push({ event: "page_view" });
  }, []);
  return (
    <>
      <title>Cap Hacker - Help Center</title>
      <Box sx={{ width: 1, margin: "0 auto" }} maxWidth="sm">
        <iframe
          height="315"
          src="https://www.youtube.com/embed/sugmxG5nUs0?si=ESF4XCkd0ZOQvVHr"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          style={{ width: "100%" }}
        ></iframe>
      </Box>
      <Faq />
    </>
  );
}
