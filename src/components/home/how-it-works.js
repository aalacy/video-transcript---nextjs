import { Box, Card, Typography } from "@mui/material";

const steps = [
  "Upload your video, by default language is English, you can choose from 97 different languages.",
  "Customize your captions - Choose Captions size, color, position & font family.",
  "Download your captioned video and share it with the world, without any watermarks!",
];

export default function HowItWorks() {
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
            How It Works
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {steps.map((content, index) => (
              <Card
                key={content}
                sx={{ maxWidth: 200, textAlign: "center", p: 1 }}
              >
                <Typography fontWeight="bold">Step {index + 1}</Typography>
                <Typography>{content}</Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
