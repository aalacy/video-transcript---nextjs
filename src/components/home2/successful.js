import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

export default function Successful() {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-around"
        sx={{
          flexWrap: "wrap",
          maxWidth: "md",
          margin: "0 auto",
          gap: 2,
          mt: 9,
        }}
      >
        <Box sx={{ maxWidth: "sm", textAlign: "center" }}>
          <Typography variant="h3" display="inline" zIndex={10}>
            Successful Creators Always Caption Their Videos!
          </Typography>
          <Typography my={2}>
            When did you see a video from a big creator without captions,
            probably never! That's because captions make their videos engaging
            and go viral
          </Typography>
        </Box>
        <Image
          src="/assets/poster.png"
          alt="Successful"
          width={1100}
          height={653}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <Box sx={{ maxWidth: "sm", width: 1, mt: 6 }}>
          <Button
            variant="contained"
            color="warning"
            sx={{ display: "block", width: 1, mt: 2 }}
          >
            Sign up Now
          </Button>
        </Box>
      </Box>
    </>
  );
}
