"use client";

import { createContext, useEffect, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { usePathname } from "next/navigation";

import { AuthService } from "@/service/auth-service";
import { checkAdmin } from "@/utils/check-admin";

const initialState = {
  title: "",
  isAuthenticated: false,
  isAdmin: false,
  isInitialized: false,
  user: null,
  shouldRefresh: false,
  confirmMessage: {},
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, isAdmin, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isAdmin,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user, isAdmin } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      isAdmin,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  VERIFY_CODE: (state) => ({ ...state }),
  RESEND_CODE: (state) => ({ ...state }),
  PASSWORD_RECOVERY: (state) => ({ ...state }),
  PASSWORD_RESET: (state) => ({ ...state }),
  REFRESH_PAGE: (state, action) => {
    const { shouldRefresh } = action.payload;
    return {
      ...state,
      shouldRefresh,
    };
  },
  SHOW_CONFIRM_DLG: (state, action) => {
    const { confirmMessage } = action.payload;
    return {
      ...state,
      confirmMessage,
    };
  },
  SET_TITLE_INFO: (state, action) => {
    const { title } = action.payload;
    return {
      ...state,
      title,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialState,
  platform: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyCode: () => Promise.resolve(),
  resendCode: () => Promise.resolve(),
  passwordRecovery: () => Promise.resolve(),
  passwordReset: () => Promise.resolve(),
  refreshPage: () => Promise.resolve(),
  showConfirmDlg: () => Promise.resolve(),
  hideConfirm: () => Promise.resolve(),
  setTitleInfo: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const pathname = usePathname();

  const hasLayout = useMemo(() => {
    return !pathname.includes("/auth");
  }, [pathname]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken) {
          const { data } = await AuthService.me();

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              isAdmin: checkAdmin(data),
              user: data,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              isAdmin: false,
              user: null,
            },
          });
          window.location.href = "/auth/login";
        }
      } catch (err) {
        window.location.href = "/auth/login";
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            isAdmin: false,
            user: null,
          },
        });
      }
    };

    hasLayout && initialize();
  }, []);

  const login = async (email, password, shouldRememberMe) => {
    const { data } = await AuthService.login(email, password, shouldRememberMe);
    const { data: user } = data;

    localStorage.setItem("accessToken", user.accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    await AuthService.logout();
    dispatch({ type: "LOGOUT" });
  };

  const register = async (values) => {
    const { data } = await AuthService.register(values);
    const { data: user } = data;

    localStorage.setItem("accessToken", user.accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const passwordRecovery = (email) => {
    AuthService.passwordRecovery(email);
    dispatch({
      type: "PASSWORD_RECOVERY",
    });
  };

  const verifyCode = (email, code) => {
    AuthService.verifyCode(email, code);
    dispatch({
      type: "VERIFY_CODE",
    });
  };

  const resendCode = (email) => {
    AuthService.resendCode(email);
    dispatch({
      type: "RESEND_CODE",
    });
  };

  const passwordReset = (email, code, password) => {
    AuthService.forgotPasswordSubmit(email, code, password);
    dispatch({
      type: "PASSWORD_RESET",
    });
  };

  const refreshPage = (shouldRefresh) => {
    dispatch({
      type: "REFRESH_PAGE",
      payload: {
        shouldRefresh,
      },
    });
  };

  const showConfirmDlg = (confirmMessage) => {
    dispatch({
      type: "SHOW_CONFIRM_DLG",
      payload: {
        confirmMessage,
      },
    });
  };

  const hideConfirm = () => {
    dispatch({
      type: "SHOW_CONFIRM_DLG",
      payload: {
        confirmMessage: { open: false },
      },
    });
  };

  const setTitleInfo = async (titleInfo) => {
    dispatch({
      type: "SET_TITLE_INFO",
      payload: {
        ...titleInfo,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "JWT",
        login,
        logout,
        register,
        verifyCode,
        resendCode,
        passwordRecovery,
        passwordReset,
        refreshPage,
        showConfirmDlg,
        hideConfirm,
        setTitleInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
