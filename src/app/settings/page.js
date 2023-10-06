import * as React from 'react';
import Container from '@mui/material/Container';
import {Box, Typography} from '@mui/material';

export default function SettingsPage() {
  return (
   <>
    <title>Settings</title>
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" gutterBottom>
          Settings Page
        </Typography>
      </Box>
    </Container>
   </>
  );
}
