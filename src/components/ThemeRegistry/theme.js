import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';

import { baseThemeOptions } from './base-theme-options';
import { lightThemeOptions } from './light-theme-options';

export const createTheme = () => {
    let theme = createMuiTheme(
      baseThemeOptions,
      lightThemeOptions,
    );
  
    return responsiveFontSizes(theme);
  };
  