import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressBar({ loading, progress }) {
  return (
    <Box
      sx={{
        display: loading ? "inherit" : "none",
        textAlign: "center",
        minHeight: 40,
        width: 1,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress?.percent || 0}
        sx={{ width: 1, height: 10 }}
      />
    </Box>
  );
}
