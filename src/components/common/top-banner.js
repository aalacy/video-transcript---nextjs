import { Typography, Box } from "@mui/material";
import Link from "next/link";

export default function TopBanner() {
  return (
    <Box
      sx={{
        color: "ButtonText",
        display: "flex",
        gap: 1,
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">Submagic Pro is Now Caphacker</Typography>
      <Link
        href="https://blog.caphacker.com/caphacker-submagic-pro-rebranded/"
        target="_blank"
      >
        <Typography sx={{ color: "orange" }}>Learn More</Typography>
      </Link>
    </Box>
  );
}
