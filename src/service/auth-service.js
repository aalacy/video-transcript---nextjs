import http from "./http";

export class AuthService {
  static me() {
    return http.get("/api/auth/me");
  }

  static async logout() {
    if (typeof window !== "undefined") {
      // window.localStorage.getItem("accessToken") &&
      //   (await http.post("/api/auth/logout"));
      window.localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
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
    if (!token) accessToken = window.localStorage.getItem("accessToken");
    return http.post("/api/auth/reset-password", {
      password,
      token,
      accessToken,
    });
  }
}
