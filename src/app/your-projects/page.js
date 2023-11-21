"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as RunIcon,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/utils";
import { FileService } from "@/service/file-service";
import { useAuth } from "@/hooks/use-auth";
import { gtm } from "@/utils/gtm";
import { useMounted } from "@/hooks/use-mounted";

const client = new FileService();

const RenderAction = (props) => {
  const { value, handleViewEdit, handleDelete, handleGenerate, status } = props;

  return (
    <Box>
      {["completed", "transcripted", "pending-generating"].includes(status) ? (
        <IconButton
          onClick={() => handleViewEdit(value)}
          variant="outlined"
          size="small"
          sx={{
            ml: 3,
          }}
          color="success"
        >
          <Tooltip title="Edit/View Project">
            <EditIcon />
          </Tooltip>
        </IconButton>
      ) : null}
      <IconButton
        onClick={() => handleDelete(value)}
        variant="outlined"
        size="small"
        sx={{
          ml: 3,
        }}
        color="error"
      >
        <Tooltip title="Delete Project">
          <DeleteIcon />
        </Tooltip>
      </IconButton>
      {status == "created" ? (
        <IconButton
          onClick={() => handleGenerate(value)}
          variant="outlined"
          size="small"
          sx={{
            ml: 3,
          }}
          color="info"
        >
          <Tooltip title="Generate Transcription">
            <RunIcon />
          </Tooltip>
        </IconButton>
      ) : null}
    </Box>
  );
};

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", width: 1, mb: 1 }}
      >
        <GridToolbarQuickFilter />
      </Box>
    </GridToolbarContainer>
  );
}

export default function YourProjectsPage() {
  const router = useRouter();
  const { setTitleInfo, showConfirmDlg, hideConfirm, isAuthenticated } =
    useAuth();
  const isMounted = useMounted();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [loading, setLoading] = useState();
  const [data, setData] = useState({
    data: [],
  });
  const [filterModel, setFilterModel] = useState({ quickFilterValues: [] });

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data } = await client.all(paginationModel, filterModel);
    setData(data);
    setLoading(false);
  }, [paginationModel, filterModel]);

  const handleViewEdit = (value) => {
    router.push(`/upload/${value}`);
  };

  const handleGenerate = async (id) => {
    try {
      setLoading(true);
      const { data } = await client.generateTranscription({ id });
      toast.success(data.message);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Something wrong happened.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    showConfirmDlg({
      open: true,
      close: hideConfirm,
      callback: async () => {
        try {
          hideConfirm();
          await client.delete(id);
          toast.success("Successfully deleted.");
          fetchData();
        } catch (error) {
          toast.error(error.message || "Something went wrong!");
        }
      },
    });
  };

  const onFilterChange = useCallback((filterModel) => {
    // Here you save the data you need from the filter model
    setFilterModel(filterModel);
  }, []);

  useEffect(() => {
    fetchData();
  }, [paginationModel, filterModel]);

  useEffect(() => {
    setTitleInfo({ title: "Your Projects" });
    gtm.push({ event: "page_view" });
  }, []);

  const columns = [
    {
      field: "name_thumbnail",
      headerName: "Name",
      description: "Thumbnail Column",
      sortable: false,
      width: 450,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            my: 1,
          }}
        >
          <Link
            href={
              ["completed", "transcripted"].includes(params.row.status)
                ? `/upload/${params.row.id}`
                : "#"
            }
          >
            <Image
              src={params.row.thumbnail}
              alt="Thumbnail image"
              width={60}
              height={100}
              placeholder="blur"
              blurDataURL="/assets/placeholder.jpg"
              style={{
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          </Link>
          <Box>
            <Chip
              size="small"
              color="info"
              label={
                <Typography
                  variant="caption"
                  sx={{ textTransform: "uppercase" }}
                >
                  {params.row.status}
                </Typography>
              }
            />
            <Typography>{params.row.fileName}</Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "duration",
      headerName: "Duration(s)",
      width: 150,
      valueFormatter: (params) =>
        Number(params.value.toFixed(2)).toLocaleString("en-US"),
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      width: 150,
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
          status={params.row.status}
          handleViewEdit={handleViewEdit}
          handleDelete={handleDelete}
          handleGenerate={handleGenerate}
        />
      ),
    },
  ];

  return (
    <>
      <title>SubmagicPro - Your Projects</title>
      <Container>
        <Card>
          <CardContent>
            <Box>
              <DataGrid
                autoHeight
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableColumnMenu
                disableRowSelectionOnClick
                disableVirtualization
                paginationMode="server"
                filterMode="server"
                onFilterModelChange={onFilterChange}
                getRowHeight={() => "auto"}
                loading={loading}
                rows={data?.data || []}
                columns={columns}
                rowCount={data?.count || 0}
                pageSizeOptions={[5]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
                slots={{ toolbar: CustomToolbar }}
                sx={{
                  "& .MuiDataGrid-columnHeaders": {
                    borderBottom: "1px solid #A6A6A6 !important",
                    bgcolor: "rgb(243, 244, 246)",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
