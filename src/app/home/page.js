"use client";

import { Box, TextField, MenuItem, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import Generate from "@/components/home2/generate";
import HowItWorks2 from "@/components/home2/how-it-works";
import Successful from "@/components/home2/successful";
import FreeAndBetter from "@/components/home2/free-and-better";
import Features from "@/components/home2/features";
import Faq from "@/components/home/faq";

export default function HomePage() {
  return (
    <>
      <title>CapHacker - Free AI Video Caption Generator</title>
      <meta
        name="description"
        content="CapHacker makes adding words to your videos super easy and totally free. Our smart tool helps you create captions fast. Try it now."
      />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta
        name="robots"
        content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
      />
      <meta property="og:url" content="https://caphacker.com/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="CapHacker - Free AI Video Caption Generator"
      />
      <meta
        property="og:description"
        content="CapHacker makes adding words to your videos super easy and totally free. Our smart tool helps you create captions fast. Try it now."
      />
      <meta charSet="UTF-8" />
      <meta name="theme-color" content="#febf4b" />
      <meta property="og:locale" content="en" />
      <meta property="og:site_name" content="Cap Hacker" />
      <link rel="canonical" href="https://caphacker.com/" />

      <Generate />

      <HowItWorks2 />

      <Successful />

      <FreeAndBetter />

      <Features />

      <Faq />
    </>
  );
}
