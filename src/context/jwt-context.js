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
  handleSave: undefined,
  handleExport: undefined,
  showDownload: false,
  fileName: "",
  loading: false,
  progress: {},
  visitorId: "",
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
  SET_HANDLE_SAVE: (state, action) => {
    const { handleSave } = action.payload;
    return {
      ...state,
      handleSave,
    };
  },
  SET_HANDLE_EXPORT: (state, action) => {
    const { handleExport } = action.payload;
    return {
      ...state,
      handleExport,
    };
  },
  SET_FILE_NAME: (state, action) => {
    const { fileName } = action.payload;
    return {
      ...state,
      fileName,
    };
  },
  SET_LOADING: (state, action) => {
    const { loading } = action.payload;
    return {
      ...state,
      loading,
    };
  },
  SET_PROGRESS: (state, action) => {
    const { progress } = action.payload;
    return {
      ...state,
      progress,
    };
  },
  SET_VISITORID: (state, action) => {
    const { visitorId } = action.payload;
    return {
      ...state,
      visitorId,
    };
  },
  SET_SHOW_DOWNLOAD: (state, action) => {
    const { showDownload } = action.payload;
    return {
      ...state,
      showDownload,
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
  setHandleSave: () => Promise.resolve(),
  setHandleExport: () => Promise.resolve(),
  setFileName: () => Promise.resolve(),
  setLoading: () => Promise.resolve(),
  setProgress: () => Promise.resolve(),
  setVisitorId: () => Promise.resolve(),
  setShowDownload: () => Promise.resolve(),
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
        }
      } catch (err) {
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
  }, [pathname]);

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

  const passwordRecovery = async (email) => {
    await AuthService.passwordRecovery(email);
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

  const passwordReset = async (password, token) => {
    await AuthService.forgotPasswordSubmit(password, token);
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

  const setHandleSave = (handleSave) => {
    dispatch({
      type: "SET_HANDLE_SAVE",
      payload: {
        handleSave,
      },
    });
  };

  const setHandleExport = (handleExport) => {
    dispatch({
      type: "SET_HANDLE_EXPORT",
      payload: {
        handleExport,
      },
    });
  };

  const setFileName = (fileName) => {
    dispatch({
      type: "SET_FILE_NAME",
      payload: {
        fileName,
      },
    });
  };

  const setLoading = (loading) => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        loading,
      },
    });
  };

  const setProgress = (progress) => {
    dispatch({
      type: "SET_PROGRESS",
      payload: {
        progress,
      },
    });
  };

  const setVisitorId = (visitorId) => {
    dispatch({
      type: "SET_VISITORID",
      payload: {
        visitorId,
      },
    });
  };

  const setShowDownload = (showDownload) => {
    dispatch({
      type: "SET_SHOW_DOWNLOAD",
      payload: {
        showDownload,
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
        setHandleSave,
        setHandleExport,
        setFileName,
        setLoading,
        setProgress,
        setVisitorId,
        setShowDownload,
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
