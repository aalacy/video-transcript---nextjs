import { Button, Typography, Menu, MenuItem } from "@mui/material";
import { Brush as BrushIcon } from "@mui/icons-material";
import { useState } from "react";

import { TEXT_TRANSFORMS } from "@/constants";

export default function FontTransformSelect({ formik }) {
  const [anchorTransformEl, setAnchorTransformEl] = useState(null);
  const openTransform = Boolean(anchorTransformEl);

  const handleTransformClick = (event) => {
    setAnchorTransformEl(event.currentTarget);
  };
  const handleTransformClose = () => {
    setAnchorTransformEl(null);
  };

  return (
    <div>
      <Button
        id="transform-button"
        startIcon={<BrushIcon fontSize="small" />}
        color="inherit"
        size="small"
        variant="outlined"
        sx={{ borderRadius: 8, p: 1, py: 0 }}
        aria-controls={openTransform ? "transform-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openTransform ? "true" : undefined}
        onClick={handleTransformClick}
      >
        <Typography
          variant="caption"
          textTransform={formik.values.textTransform}
        >
          {formik.values.textTransform}
        </Typography>
      </Button>
      <Menu
        id="transform-menu"
        anchorEl={anchorTransformEl}
        open={openTransform}
        onClose={handleTransformClose}
        MenuListProps={{
          "aria-labelledby": "transform-button",
        }}
      >
        {TEXT_TRANSFORMS.map((textTransform) => (
          <MenuItem
            key={textTransform}
            selected={formik.values.textTransform == textTransform}
            onClick={() => {
              handleTransformClose();
              formik.setFieldValue("textTransform", textTransform);
            }}
          >
            {textTransform}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
