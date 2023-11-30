import { Button, Typography, Menu, MenuItem } from "@mui/material";
import { FormatBold as BoldIcon } from "@mui/icons-material";
import { useState } from "react";

import { FONT_WEIGHTS } from "@/constants";

export default function FontWeightSelect({ formik }) {
  const [anchorWeightEl, setAnchorWeightEl] = useState(null);
  const openWeight = Boolean(anchorWeightEl);
  const handleWeightClick = (event) => {
    setAnchorWeightEl(event.currentTarget);
  };
  const handleWeightClose = () => {
    setAnchorWeightEl(null);
  };

  return (
    <div>
      <Button
        id="weight-button"
        startIcon={<BoldIcon fontSize="small" />}
        color="inherit"
        size="small"
        variant="outlined"
        sx={{ borderRadius: 8, p: 0, py: 0 }}
        aria-controls={openWeight ? "weight-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openWeight ? "true" : undefined}
        onClick={handleWeightClick}
      >
        <Typography variant="caption" fontWeight={formik.values.fontWeight}>
          {formik.values.fontWeight}
        </Typography>
      </Button>
      <Menu
        id="weight-menu"
        anchorEl={anchorWeightEl}
        open={openWeight}
        onClose={handleWeightClose}
        MenuListProps={{
          "aria-labelledby": "weight-button",
        }}
      >
        {FONT_WEIGHTS.map((fontWeight) => (
          <MenuItem
            key={fontWeight}
            selected={formik.values.fontWeight == fontWeight}
            onClick={() => {
              handleWeightClose();
              formik.setFieldValue("fontWeight", fontWeight);
            }}
          >
            {fontWeight}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
