import { Box, Typography } from "@mui/material";

export default function Logo(props) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        ...props,
        width: "auto",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ color: "black", fontFamily: "Times New Roman" }}
      >
        Submagic
      </Typography>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "warning.light", fontFamily: "Times New Roman" }}
      >
        PRO
      </Typography>
    </Box>
  );
}
