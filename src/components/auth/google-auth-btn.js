import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";

import { GoogleLogo } from "@/components/common/google-logo";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthService } from "@/service/auth-service";

export default function GoogleAuthBtn() {
  const router = useRouter();

  const handleRegister = async (value) => {
    try {
      const { data } = await AuthService.googleRegister(value);
      localStorage.setItem("accessToken", data.data.accessToken);
      router.push("/");
    } catch (error) {
      if (error.status !== 403 && error.status !== 404) {
        toast.error(error.message)
      }
    }
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleRegister(codeResponse),
    onError: (error) => toast.error(error),
  });

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      onClick={login}
      startIcon={<GoogleLogo />}
    >
      <Typography>Continue with Google</Typography>
    </Button>
  );
}
