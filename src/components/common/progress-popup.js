import {
  Dialog,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ProgressBar from "./progress-bar";

export const ProgressModal = (props) => {
  const { open, onClose, loading, progress } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={loading}
      aria-labelledby="Progress Modal"
      aria-describedby="Progress Modal"
    >
      <DialogContent>
        <Typography
          variant="h5"
          fontWeight="medium"
          sx={{ textAlign: "center", my: 2 }}
        >
          {progress?.message}&nbsp;{progress?.percent?.toFixed(2)}%...
        </Typography>
        <ProgressBar loading={loading} progress={progress} />
      </DialogContent>
    </Dialog>
  );
};
