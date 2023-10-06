"use client";

import { Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { Edit as EditIcon } from "@mui/icons-material";

import { useSwrFetcher } from "@/hooks/useSwrFetcher";
import { useRouter } from "next/navigation";

const RenderAction = (props) => {
  const { value, handleViewEdit } = props;

  return (
    <Button
      onClick={() => handleViewEdit(value)}
      variant="outlined"
      size="small"
      sx={{
        ml: 3,
      }}
      color="primary"
      startIcon={<EditIcon fontSize="small" color="primary" />}
    >
      <Typography variant="caption">View / Edit</Typography>
    </Button>
  );
};

export default function YourVideosPage() {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const { data, loading, error } = useSwrFetcher(
    `/api/file?page=${paginationModel.page + 1}&take=${
      paginationModel.pageSize
    }`,
  );

  const handleViewEdit = (value) => {
    router.push(`/upload/${value}`);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "ext",
      headerName: "Ext",
      width: 150,
      editable: true,
    },
    {
      field: "id",
      type: "actions",
      headerName: "",
      description: "Action Column",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <RenderAction {...params} handleViewEdit={handleViewEdit} />
      ),
    },
  ];

  return (
    <>
      <title>Your Videos</title>
      <Container>
        <DataGrid
          loading={loading}
          rows={data?.data || []}
          columns={columns}
          rowCount={data?.count}
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      </Container>
    </>
  );
}
