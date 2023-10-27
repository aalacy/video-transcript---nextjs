import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

const images = [
  "/images/sample1.jpg",
  "/images/sample2.jpg",
  "/images/sample3.jpg",
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
          mt: 10,
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
              mb: 5,
              gap: 1,
            }}
          >
            {images.map((src) => (
              <Image
                key={src}
                src={src}
                width={300}
                height={500}
                alt="Sample image"
                style={{ borderRadius: 16 }}
              />
            ))}
          </Box>
          <Button
            variant="contained"
            href="/auth/signup"
            sx={{
              px: {
                md: 20,
              },
            }}
          >
            Sign up now
          </Button>
        </Box>
      </Box>
    </>
  );
}
