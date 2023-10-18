import { Box, Button, Typography } from "@mui/material";
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
        id="create-content-like"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 5,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1, textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 5 }}>
            Create Content like Top Influencers
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: 4,
              mb: 3,
            }}
          >
            {images.map((src) => (
              <Image
                key={src}
                src={src}
                width={200}
                height={300}
                alt="Sample image"
                style={{ borderRadius: 4 }}
              />
            ))}
          </Box>
          <Button variant="contained" href="/auth/signup">
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
}
