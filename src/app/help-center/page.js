import * as React from "react";
import Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";

export default function SettingsPage() {
  return (
    <>
      <title>Help Center</title>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" gutterBottom>
            Help Center Page
          </Typography>
        </Box>
      </Container>
    </>
  );
}
