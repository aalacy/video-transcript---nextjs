import { TextField, Typography, MenuItem } from "@mui/material";

import { GOOGLE_FONTS } from "@/constants";

export default function FontSelect({ formik }) {
  return (
    <TextField
      select
      fullWidth
      name="font"
      value={formik.values.font}
      onBlur={formik.handleBlur}
      onChange={formik.handleChange}
      error={!!formik.touched.font && !!formik.errors.font}
      helperText={formik.touched.font && formik.errors.font}
      label="Font"
      size="small"
      sx={{ mb: 1 }}
    >
      {Array.from(Object.keys(GOOGLE_FONTS)).map((font) => (
        <MenuItem key={font} value={font}>
          <Typography
            fontWeight="medium"
            variant="h6"
            sx={{
              fontFamily: GOOGLE_FONTS[font],
            }}
          >
            {font}
          </Typography>
        </MenuItem>
      ))}
    </TextField>
  );
}
