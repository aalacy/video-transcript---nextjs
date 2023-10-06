'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GoogleOAuthProvider } from '@react-oauth/google';

import NextAppDirEmotionCacheProvider from './EmotionCache';
import { createTheme } from './theme';

export default function ThemeRegistry({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <ThemeProvider theme={createTheme()}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </GoogleOAuthProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
