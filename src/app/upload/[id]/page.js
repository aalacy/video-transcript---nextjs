"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab, Typography, Box, Container } from "@mui/material";

import DesignTabPanel from "@/components/upload/tab-design";
import VideoPlayer from "@/components/upload/video-player";
import TranscriptionTabPanel from "@/components/upload/tab-transcription";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const tabStyle = {
  mb: 1,
  borderRadius: 8,
  "&.Mui-selected": {
    backgroundColor: "background.paper",
    boxShadow: 2,
  },
};

export default function UploadPage({ params }) {
  const { data, loading, error } = useSwrFetcher(`/api/file/${params.id}`);

  const [value, setValue] = useState(0);
  const [values, setValues] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <title>Upload</title>
      <Container maxWidth="md" sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Box maxWidth="sm">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="inherit"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width Upload Tab"
              sx={{
                mb: 1,
              }}
            >
              <Tab label="Transcription" sx={tabStyle} {...a11yProps(0)} />
              <Tab label="Design" sx={tabStyle} {...a11yProps(1)} />
            </Tabs>
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
              <TranscriptionTabPanel id={params.id} vtt={data?.vtt} />
              <DesignTabPanel index={1} data={data} setValues={setValues} />
            </SwipeableViews>
          </Box>
          <Box>
            <VideoPlayer url={data?.output} values={values} />
          </Box>
        </Box>
      </Container>
    </>
  );
}
