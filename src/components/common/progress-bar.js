import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressBar({ loading, progress }) {
  return (
    <Box
      sx={{
        display: loading ? "inherit" : "none",
        textAlign: "center",
        minHeight: 100,
        margin: "0 auto",
        mt: 10,
        width: 1 / 3,
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress?.percent || 0}
        sx={{ width: 1, height: 10 }}
      />
      <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
        {progress?.message || "Loading..."}
      </Typography>
    </Box>
  );
}