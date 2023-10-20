import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Typography } from "@mui/material";
import Cookies from "js-cookie";

import { GoogleLogo } from "@/components/common/google-logo";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthService } from "@/service/auth-service";
import { useAuth } from "@/hooks/use-auth";

export default function GoogleAuthBtn() {
  const router = useRouter();

  const { setLoading } = useAuth();

  const handleRegister = async (value) => {
    try {
      setLoading(true);
      const { data } = await AuthService.googleRegister(value);
      Cookies.set("accessToken", data.data.accessToken);
      router.push("/");
    } catch (error) {
      if (error.status !== 403 && error.status !== 404) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
