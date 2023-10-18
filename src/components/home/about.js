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
          mt: 4,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h4" sx={{ mb: 5, textAlign: "center" }}>
            About us
          </Typography>
          <Typography>
            Note: Submagic.pro has no relation with any other website. Our
            website is made for short form content creators (Tiktokers,
            Instagram reelers, youtube short content creators etc)
          </Typography>
        </Box>
      </Box>
    </>
  );
}
