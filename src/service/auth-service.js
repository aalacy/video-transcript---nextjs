import http from "./http";
import Cookies from "js-cookie";

export class AuthService {
  static me() {
    return http.get("/api/auth/me");
  }

  static async logout() {
    Cookies.remove("accessToken");
    window.location.href = "/";
  }

  static login(email, password, shouldRememberMe) {
    return http.post("/api/auth/login", {
      email,
      password,
      shouldRememberMe,
    });
  }

  static register(values) {
    return http.post("/api/auth/register", values);
  }

  static googleRegister(user) {
    return http.post("/api/auth/google-register", user);
  }

  static passwordRecovery(email) {
    return http.post("/api/auth/password-recovery", { email });
  }

  static verifyCode(email, code) {}

  static resendCode(email) {
    return http.post("/api/auth/password-recovery", { email });
  }

  static forgotPasswordSubmit(password, token) {
    let accessToken = "";
    if (!token) accessToken = Cookies.get("accessToken");
    return http.post("/api/auth/reset-password", {
      password,
      token,
      accessToken,
    });
  }
}
