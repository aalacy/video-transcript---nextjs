import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";

import { DRAWER_WIDTH } from "@/constants";

export default function Footer({ hasLayout }) {
  const isNonMobile = useMediaQuery("(min-width:640px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 1,
        flexWrap: "wrap",
        my: 2,
        px: 2,
        ml: isNonMobile && hasLayout ? `${DRAWER_WIDTH}px` : 0,
      }}
    >
      <Typography>Copyright © 2023 Cap Hacker</Typography>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        <Typography>All Rights Reserved</Typography>
        <Link href="https://blog.caphacker.com/tos/" target="_blank">
          Terms and Conditions
        </Link>
        <Link href="https://blog.caphacker.com/privacy-policy/" target="_blank">
          Privacy Policy
        </Link>
      </Stack>
    </Box>
  );
}
