import { Box, Typography } from "@mui/material";

import { CameraIcon, UploadIcon, VideoIcon } from "@/icons";

const steps = [
  "Upload your video, by default language is english, you can choose from 97 different languages.",
  "Wait for upload & transcription, once done you will see the download button.",
  "Download your captioned video and share it with the world, without any watermarks!",
];

const icons = [
  <CameraIcon sx={{ fontSize: 60 }} />,
  <UploadIcon sx={{ fontSize: 60 }} />,
  <VideoIcon sx={{ fontSize: 60 }} />,
];

export default function HowItWorks() {
  return (
    <>
      <Box
        id="how-it-works"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 1,
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
              width: 1,
              gap: 2,
            }}
          >
            {steps.map((content, index) => (
              <Box
                key={content}
                sx={{ maxWidth: 300, textAlign: "center", p: 1 }}
              >
                {icons[index]}
                <Typography sx={{ my: 1 }} variant="h6">
                  Step {index + 1}
                </Typography>
                <Typography color="GrayText">{content}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
