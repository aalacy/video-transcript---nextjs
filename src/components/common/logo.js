import { Box, Typography } from "@mui/material";

const mainSizeMap = {
  small: "h5",
  medium: "h4",
  large: "h3",
};

const secondSizeMap = {
  small: "h6",
  medium: "h4",
  large: "h4",
};

export default function Logo({ size = "large", width = "100px" }) {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: width || "auto",
        margin: "0 auto",
      }}
    >
      <Typography
        variant={mainSizeMap[size]}
        fontWeight="bold"
        sx={{ color: "black", fontFamily: "Times New Roman" }}
      >
        Submagic
      </Typography>
      <Typography
        variant={secondSizeMap[size]}
        fontWeight="bold"
        sx={{ color: "warning.light", fontFamily: "Times New Roman" }}
      >
        PRO
      </Typography>
    </Box>
  );
}
