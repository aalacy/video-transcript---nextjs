import { Box, Typography } from "@mui/material";

import "./style.css";

const rows = [
  {
    id: 1,
    feature: "Cost",
    traditional: "Usually Start at $16/month",
    submagicPro: "Free",
  },
  {
    id: 2,
    feature: "Accuracy",
    traditional: "Limited",
    submagicPro: "Highly Accurate",
  },
  {
    id: 3,
    feature: "Free",
    traditional: "Watermarked Results & Limited",
    submagicPro: "No Watermark & Unlimited",
  },
  {
    id: 4,
    feature: "Customization",
    traditional: "Limited",
    submagicPro: "Extensive",
  },
  {
    id: 5,
    feature: "Real-Time Editing",
    traditional: "Rarely Available",
    submagicPro: "Available",
  },
  {
    id: 6,
    feature: "Multi-Language Support",
    traditional: "Usually 56 languages",
    submagicPro: "99 languages",
  },
];

export default function SubmagicProVsTraditional() {
  return (
    <>
      <Box
        id="compare"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 5,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
            SubMagic Pro vs Traditional Captioning Tools
          </Typography>
          <Typography textAlign="center">
            Traditional Captioning tools are not friendly for short-form
            content. Moreover, they make mistakes while generating subtitles.
            Correcting them can be a time-consuming process.
          </Typography>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Traditional Captioning Tools</th>
                <th>SubMagic Pro</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.feature}</td>
                  <td>{row.traditional}</td>
                  <td>{row.submagicPro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  );
}
