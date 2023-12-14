"use client";

import { Box, Typography, Button, Grid } from "@mui/material";
import Image from "next/image";

import { YelloBottom } from "@/icons/yellow-bottom";
import { Pattern } from "@/icons/pattern";

export default function Generate() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-around"
        sx={{
          flexWrap: "wrap",
          maxWidth: "md",
          margin: "0 auto",
          gap: 2,
          mt: 9,
        }}
      >
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" display="inline" zIndex={10}>
              AI Video Caption Generator Free Without Watermark
            </Typography>
            <YelloBottom sx={{ width: 1, mt: -1 }} />
            <Typography
              color="GrayText"
              textAlign="center"
              variant="h6"
              fontWeight="light"
              mt={2}
            >
              Save TIME and EFFORT and MONEY with our easy-to-use tool.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              sx={{ display: "block", width: 1, mt: 2 }}
            >
              Sign up
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ width: 1 }}>
            <Image
              src="/assets/first.png"
              alt="first"
              width={460}
              height={354}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Pattern
        sx={{
          width: 1,
          fontSize: 250,
          margin: "0 auto",
          mt: -7,
          height: "130px",
        }}
      />
    </>
  );
}
