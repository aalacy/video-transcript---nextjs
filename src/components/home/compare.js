import { Box, Typography } from "@mui/material";

import "./style.css";

const rows = [
  {
    id: 1,
    feature: "Cost",
    traditional: "Usually Start at $16/month",
    capHacker: "Free",
  },
  {
    id: 2,
    feature: "Accuracy",
    traditional: "Limited",
    capHacker: "Highly Accurate",
  },
  {
    id: 3,
    feature: "Free",
    traditional: "Watermarked Results & Limited",
    capHacker: "No Watermark & Unlimited",
  },
  {
    id: 4,
    feature: "Customization",
    traditional: "Limited",
    capHacker: "Extensive",
  },
  {
    id: 5,
    feature: "Real-Time Editing",
    traditional: "Rarely Available",
    capHacker: "Available",
  },
  {
    id: 6,
    feature: "Multi-Language Support",
    traditional: "Usually 56 languages",
    capHacker: "99 languages",
  },
];

export default function CapHackerProVsTraditional() {
  return (
    <>
      <Box
        id="compare"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 10,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Cap Hacker vs Traditional Captioning Tools
          </Typography>
          <Typography
            maxWidth="sm"
            textAlign="center"
            color="GrayText"
            sx={{ margin: "0 auto", mb: 5 }}
          >
            Traditional Captioning tools are not friendly for short-form
            content. Moreover, they make mistakes while generating subtitles.
            Correcting them can be a time-consuming process.
          </Typography>
          <Box sx={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Traditional Captioning Tools</th>
                  <th>
                    Cap<span style={{ color: "#FFBF4C" }}>Hacker</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.feature}</td>
                    <td>{row.traditional}</td>
                    <td>{row.capHacker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </>
  );
}
