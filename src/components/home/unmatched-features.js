import { Box, Typography } from "@mui/material";

const features = [
  {
    feature: "Super Duper Accurate",
    content:
      "Submagic is using the latest tech to convert your speech into text. Our AI is the most accurate when it comes to transcribing content.",
  },
  {
    feature: "Edit Captions",
    content:
      "You can edit your transcribe like a Word document. AI can make mistakes for newly invented words.",
  },
  {
    feature: "Adjust the colors",
    content:
      "Choose the color from the color picker. Adjust the colors of the captions and background, view the changes in real time.",
  },
  {
    feature: "Customize Font Family",
    content:
      "Choose the perfect font from a given library. Make your subtitles bold, italic or underline them.",
  },
];

export default function UnmatchedFeatures() {
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
            SubMagic Pro Unmatched Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
            }}
          >
            {features.map(({ feature, content }) => (
              <Typography key={feature}>
                <b>{feature}:</b>&nbsp;{content}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
