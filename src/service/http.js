"use client";

import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const $api = axios.create({
  validateStatus: function (status) {
    return status == 200 || status == 201;
  },
  // timeout: 1225000,
  baseURL: `${API_URL}`,
});

// axios.defaults.withCredentials = true;

// on each request to the server, we pull out the current "access" token saved in the cookie and send it to the server for authentication
// access token is only valid for 10 minutes, so it's more secure when combined with checking refresh tokena across sessions at the same time
$api.interceptors.request.use(async (config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

const clearCookie = () => {
  Cookies.remove("accessToken");
};

// when responding from the server with a 401 error status, meaning that the access token has expired
//   we send an additional request to get a new refresh and access token pair with an updated lifetime and store it in a cookie,
// then we repeat the original request again, but with an updated token
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    // const { url } = error.config;
    if (error.response?.status == 403) {
      clearCookie();
      location.href = "/auth/login";
    } else if (error.response?.status == 402) {
      console.log("error 402", error);
      // Cookies.remove('subscribedPlan')
    }
    throw error;
  },
);

export default $api;
