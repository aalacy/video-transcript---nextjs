import { Box, Typography } from "@mui/material";
import Image from "next/image";

const images = [
  "/images/sample1.jpeg",
  "/images/sample2.webp",
  "/images/sample3.jpeg",
];

export default function CreateContentLike() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 5,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
            Create Content like Top Influencers
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {images.map((src) => (
              <Image src={src} width={200} height={300} alt="Sample image" />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
