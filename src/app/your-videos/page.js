"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { Delete, Edit as EditIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { buffer2String, formatDate } from "@/utils";
import { FileService } from "@/service/file-service";
import RootLayout from "@/components/common/layout";

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

  const handleDelete = async (id) => {
    try {
      await client.delete(id);
      toast.success("Successfully deleted.");
      fetchData();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "name_thumbnail",
      headerName: "Name",
      description: "Thumbnail Column",
      sortable: false,
      width: 400,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <img
            src={
              params.row.thumbnail
                ? "data:image/png;base64," + buffer2String(params.value.data)
                : "/assets/placeholder.jpg"
            }
            alt="Thumbnail image"
            loading="lazy"
            style={{
              width: 100,
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
          <Typography>{params.row.fileName}</Typography>
        </Box>
      ),
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
      headerName: "Actions",
      description: "Actions Column",
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
    <RootLayout>
      <title>Your Videos</title>
      <Container>
        <Card>
          <CardContent>
            <Box sx={{ height: 380 }}>
              <DataGrid
                autoHeight
                disableRowSelectionOnClick
                loading={loading}
                rows={data?.data || []}
                columns={columns}
                rowCount={data?.count}
                pageSizeOptions={[5]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    borderBottom: "2px solid #A6A6A6 !important",
                    bgcolor: "primary.main",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </RootLayout>
  );
}
