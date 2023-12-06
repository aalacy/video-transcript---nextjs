import {
  CustomizeYourCaptionsIcon,
  DownloadAnytimeIcon,
  EditYourCaptionsIcon,
  SaveProjectIcon,
  UploadLargeFilesIcon,
} from "@/icons";
import { PatternRounded } from "@/icons/pattern-rounded";
import { Box, Grid, Typography } from "@mui/material";

const items = [
  {
    icon: <UploadLargeFilesIcon sx={{ fontSize: 40 }} />,
    title: "Upload Large Files",
    content:
      "Logged in users can upload large files up to 100 MB. CapHacker empowers you to get the most out of your captions.",
  },
  {
    icon: <CustomizeYourCaptionsIcon sx={{ fontSize: 40 }} />,
    title: "Customize your Captions",
    content:
      "CapHacker lets you choose font family, color, background color, position and size. Make your captions uniquely yours.",
  },
  {
    icon: <DownloadAnytimeIcon sx={{ fontSize: 40 }} />,
    title: "Download Anytime",
    content:
      "Your Files are stored on our server. You can download them at any time.",
  },
  {
    icon: <EditYourCaptionsIcon sx={{ fontSize: 40 }} />,
    title: "Edit your Captions",
    content:
      "Found a typo or mistake? No problem! You can edit your captions at any time.",
  },
  {
    icon: <SaveProjectIcon sx={{ fontSize: 40 }} />,
    title: "Save Project",
    content:
      "Save your project, make changes later on as per your requirements. Pick up right where you left off.",
  },
];

export default function GetMoreFeatures() {
  return (
    <>
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: "md",
          width: 1,
          mt: 7,
        }}
      >
        <Typography variant="h5" sx={{ width: 1, mb: 3 }}>
          Sign up to Get More Features
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            {items.map(({ icon, title, content }) => (
              <Box
                key={title}
                sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}
              >
                <Box sx={{ bgcolor: "warning.main", p: 2, borderRadius: 4 }}>
                  {icon}
                </Box>
                <Box>
                  <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    {title}
                  </Typography>
                  <Typography color="GrayText" variant="body2">
                    {content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              minHeight: 450,
            }}
          >
            <img
              src="/assets/static-asset.png"
              alt="Static asset"
              width="100%"
              height="100%"
              style={{
                objectFit: "contain",
                borderRadius: 2,
                // box-shadow: 1px 1px 1px black;
                /* box-shadow: 3px 3px red inset, -1em 0 0.4em olive; */
                /* box-shadow: inset 5em 1em gold; */
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
