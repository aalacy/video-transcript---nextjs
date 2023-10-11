import { Box, Typography } from "@mui/material";

export default function Logo(props) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        ...props,
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Submagic
      </Typography>
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: "warning.light" }}
      >
        PRO
      </Typography>
    </Box>
  );
}
