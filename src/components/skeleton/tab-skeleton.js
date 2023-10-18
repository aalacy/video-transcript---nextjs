"use client";

import { Skeleton, Box } from "@mui/material";

export const TabSkeleton = (props) => {
  const { height, loading } = props;

  return (
    <Box
      sx={{
        width: "80%",
        minHeight: height || 400,
        height: "100%",
        display: loading ? "flex" : "none",
        justifyContent: "space-around",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
};
