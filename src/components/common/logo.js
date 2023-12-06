import { Box, Typography } from "@mui/material";

const mainSizeMap = {
  small: "h5",
  medium: "h4",
  large: "h3",
};

const secondSizeMap = {
  small: "h5",
  medium: "h4",
  large: "h4",
};

export default function Logo({ size = "large", width = "auto" }) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: width || "auto",
      }}
    >
      <Typography
        variant={mainSizeMap[size]}
        fontWeight="bold"
        sx={{ color: "black", fontFamily: "Times New Roman" }}
      >
        Cap
      </Typography>
      <Typography
        variant={secondSizeMap[size]}
        fontWeight="bold"
        sx={{ color: "warning.light", fontFamily: "Times New Roman" }}
      >
        Hacker
      </Typography>
    </Box>
  );
}
