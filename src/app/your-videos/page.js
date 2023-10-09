"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { Delete, Edit as EditIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { buffer2String, formatDate } from "@/utils";
import { FileService } from "@/service/file-service";

const RenderAction = (props) => {
  const { value, handleViewEdit, handleDelete } = props;

  return (
    <>
      <IconButton
        onClick={() => handleViewEdit(value)}
        variant="outlined"
        size="small"
        sx={{
          ml: 3,
        }}
        color="success"
      >
        <Tooltip title="Edit/View Video">
          <EditIcon />
        </Tooltip>
      </IconButton>
      <IconButton
        onClick={() => handleDelete(value)}
        variant="outlined"
        size="small"
        sx={{
          ml: 3,
        }}
        color="error"
      >
        <Tooltip title="Delete Video">
          <Delete />
        </Tooltip>
      </IconButton>
    </>
  );
};

const client = new FileService();

export default function YourVideosPage() {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [loading, setLoading] = useState();
  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await client.all(paginationModel);
    setData(data);
    setLoading(false);
  }, [paginationModel]);

  const handleViewEdit = (value) => {
    router.push(`/upload/${value}`);
  };

  const handleDelete = (id) => {};

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "thumbnail",
      headerName: "Thumbnail",
      description: "Thumbnail Column",
      sortable: false,
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <img
            src={"data:image/png;base64," + buffer2String(params.value.data)}
            alt="Thumbnail image"
            loading="lazy"
            style={{
              width: 100,
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        ) : (
          <></>
        ),
    },
    {
      field: "fileName",
      headerName: "Name",
      width: 350,
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      width: 200,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "id",
      type: "actions",
      headerName: "Action",
      description: "Action Column",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <RenderAction
          {...params}
          handleViewEdit={handleViewEdit}
          handleDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <>
      <title>Your Videos</title>
      <Container>
        <Card>
          <CardContent>
            <Box sx={{ minHeight: 380 }}>
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
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
