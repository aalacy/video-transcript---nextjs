import { TextField, Typography, MenuItem } from "@mui/material";

import { GOOGLE_FONTS, TEMPLATES } from "@/constants";

function RenderTemplate({ template }) {
  return (
    <Typography
      variant="body2"
      sx={{
        textTransform: "uppercase",
        fontWeight: "medium",
        color: template.metadata.fontColor,
        bgcolor: template.metadata.backgroundColor,
        fontFamily: GOOGLE_FONTS[template.metadata.font],
        px: 1,
      }}
    >
      {template.name}
    </Typography>
  );
}

export default function TemplateSelect({ formik }) {
  return (
    <TextField
      select
      fullWidth
      name="template"
      value={formik.values.template}
      onBlur={formik.handleBlur}
      onChange={(event) => {
        const id = event.target.value;
        const template = TEMPLATES.find((template) => template.id === id);
        formik.setFieldValue("template", id);
        const { metadata } = template;
        formik.setFieldValue("font", metadata.font);
        formik.setFieldValue("fontColor", metadata.fontColor);
        formik.setFieldValue("backgroundColor", metadata.backgroundColor);
      }}
      error={!!formik.touched.template && !!formik.errors.template}
      helperText={formik.touched.template && formik.errors.template}
      label="Templates"
      size="small"
      sx={{ mb: 1 }}
      SelectProps={{
        renderValue: (selected) => (
          <RenderTemplate
            template={TEMPLATES.find((template) => template.id === selected)}
          />
        ),
      }}
    >
      {TEMPLATES.map((template) => (
        <MenuItem key={template.id} value={template.id}>
          <RenderTemplate template={template} />
        </MenuItem>
      ))}
    </TextField>
  );
}
