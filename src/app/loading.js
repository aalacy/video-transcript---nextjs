import { Box, CircularProgress, Container } from "@mui/material";

export default function Loading() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 48px)",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    </Container>
  );
}
