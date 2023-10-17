import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "feature", headerName: "Feature", width: 200, sortable: false },
  {
    field: "traditional",
    headerName: "Traditional Captioning Tools",
    width: 200,
    sortable: false,
  },
  {
    field: "submagicPro",
    headerName: "SubMagic Pro",
    width: 200,
    sortable: false,
  },
];

const rows = [
  {
    id: 1,
    feature: "Cost",
    traditional: "Usually Start at $16/month",
    submagicPro: "Free",
  },
  {
    id: 2,
    feature: "Accuracy",
    traditional: "Limited",
    submagicPro: "Highly Accurate",
  },
  {
    id: 3,
    feature: "Free",
    traditional: "Watermarked Results & Limited",
    submagicPro: "No Watermark & Unlimited",
  },
  {
    id: 4,
    feature: "Customization",
    traditional: "Limited",
    submagicPro: "Extensive",
  },
  {
    id: 5,
    feature: "Real-Time Editing",
    traditional: "Rarely Available",
    submagicPro: "Available",
  },
  {
    id: 6,
    feature: "Multi-Language Support",
    traditional: "Usually 56 languages",
    submagicPro: "Free",
  },
];

export default function SubmagicProVsTraditional() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 1,
          mt: 5,
        }}
      >
        <Box maxWidth="md" sx={{ width: 1 }}>
          <Typography variant="h5" sx={{ mb: 5, textAlign: "center" }}>
            SubMagic Pro vs Traditional Captioning Tools
          </Typography>
          <Typography textAlign="center">
            Traditional Captioning tools are not friendly for short-form
            content. Moreover, they make mistakes while generating subtitles.
            Correcting them can be a time-consuming process.
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            density="comfortable"
            rowSelection={false}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableRowSelectionOnClick
            disableMultipleRowSelection
            disableDensitySelector
            disableVirtualization
            hideFooter
            autoHeight
            hideFooterPagination
            sx={{
              mt: 5,
              "& .MuiDataGrid-cell": {
                border: 1,
                borderColor: "black !important",
                whiteSpace: "break-spaces !important",
              },
              "& .MuiDataGrid-columnHeader": {
                border: 1,
                borderColor: "black !important",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                fontSize: "1.1rem",
                whiteSpace: "break-spaces !important",
                lineHeight: "22px !important",
              },
              "& .MuiDataGrid-cell.MuiDataGrid-withBorderColor:last-child": {
                display: "none",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
}
