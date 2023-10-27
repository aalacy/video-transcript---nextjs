import {
  SuperDuperAccurate,
  EditCaptions,
  AjustTheColors,
  CustomizeFontFamily,
} from "@/icons";
import { Box, Typography } from "@mui/material";

const features = [
  {
    icon: <SuperDuperAccurate sx={{ fontSize: 60 }} />,
    feature: "Super Duper Accurate",
    content:
      "Submagic is using the latest tech to convert your speech into text. Our AI is the most accurate when it comes to transcribing content.",
  },
  {
    icon: <EditCaptions sx={{ fontSize: 60 }} />,
    feature: "Edit Captions",
    content:
      "You can edit your transcribe like a Word document. AI can make mistakes for newly invented words.",
  },
  {
    icon: <AjustTheColors sx={{ fontSize: 60 }} />,
    feature: "Adjust the colors",
    content:
      "Choose the color from the color picker. Adjust the colors of the captions and background, view the changes in real time.",
  },
  {
    icon: <CustomizeFontFamily sx={{ fontSize: 60 }} />,
    feature: "Customize Font Family",
    content:
      "Choose the perfect font from a given library. Make your subtitles bold, italic or underline them.",
  },
];

export default function UnmatchedFeatures() {
  return (
    <>
      <Box
        id="unmatched-features"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 10,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
            SubMagic Pro Unmatched Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: 1,
              mt: 5,
              gap: 2,
            }}
          >
            {features.map(({ icon, feature, content }) => (
              <Box textAlign="center" key={feature}>
                {icon}
                <Typography sx={{ my: 1 }}>
                  <b>{feature}</b>
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
