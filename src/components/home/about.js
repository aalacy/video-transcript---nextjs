"use client";

import { Box, Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Box
        id="about"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 10,
        }}
      >
        <Box maxWidth="sm" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            About Submagic pro
          </Typography>
          <Typography color="GrayText" textAlign="center">
            Submagic lets you effortlessly add captions to your videos. It is
            completely FREE & NO sign up required.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
