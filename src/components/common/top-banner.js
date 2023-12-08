import { Close } from "@mui/icons-material";
import { Typography, Box, IconButton, Slide } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TopBanner() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => setChecked(true), 500);
  }, []);

  const onClose = () => setChecked(false);

  return (
    <Slide in={checked}>
      <Box
        sx={{
          color: "ButtonText",
          display: checked ? "flex" : "none",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          flexWrap: "wrap",
        }}
      >
        <Box display="flex" gap={1}>
          <Typography variant="h6">Submagic Pro is Now Caphacker</Typography>
          <Link
            href="https://blog.caphacker.com/caphacker-submagic-pro-rebranded/"
            target="_blank"
          >
            <Typography sx={{ color: "orange" }}>Learn More</Typography>
          </Link>
        </Box>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <Close />{" "}
        </IconButton>
      </Box>
    </Slide>
  );
}
