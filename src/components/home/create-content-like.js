import { Box, Button, Typography } from "@mui/material";

const videos = [
  "https://www.youtube.com/embed/SAG_Lqo-KBw",
  "https://www.youtube.com/embed/edWSAHi4wGU",
  "https://www.youtube.com/embed/S_CUEOBZ0P4",
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
            {videos.map((src) => (
              <iframe
                width="300"
                height="533"
                src={src}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                style={{ borderRadius: 12 }}
              ></iframe>
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
