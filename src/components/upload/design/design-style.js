import { Button, Typography, Menu, MenuItem } from "@mui/material";
import { FormatItalic as FormatItalicIcon } from "@mui/icons-material";
import { useState } from "react";

import { FONT_STYLES } from "@/constants";

export default function FontStyleSelect({ formik }) {
  const [anchorStyleEl, setAnchorStyleEl] = useState(null);
  const openStyle = Boolean(anchorStyleEl);

  const handleStyleClick = (event) => {
    setAnchorStyleEl(event.currentTarget);
  };
  const handleStyleClose = () => {
    setAnchorStyleEl(null);
  };

  return (
    <div>
      <Button
        id="italic-button"
        startIcon={<FormatItalicIcon fontSize="small" />}
        color="inherit"
        size="small"
        variant="outlined"
        sx={{ borderRadius: 8, p: 1, py: 0 }}
        aria-controls={openStyle ? "italic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openStyle ? "true" : undefined}
        onClick={handleStyleClick}
      >
        <Typography variant="caption" fontStyle={formik.values.fontStyle}>
          {formik.values.fontStyle}
        </Typography>
      </Button>
      <Menu
        id="italic-menu"
        anchorEl={anchorStyleEl}
        open={openStyle}
        onClose={handleStyleClose}
        MenuListProps={{
          "aria-labelledby": "italic-button",
        }}
      >
        {FONT_STYLES.map((fontStyle) => (
          <MenuItem
            key={fontStyle}
            selected={formik.values.fontStyle == fontStyle}
            onClick={() => {
              handleStyleClose();
              formik.setFieldValue("fontStyle", fontStyle);
            }}
          >
            {fontStyle}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
