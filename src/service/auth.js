"use client";

import axios from "axios";

export const getRefreshToken = async (code) => {
  try {
    const data = new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      grant_type: "authorization_code",
      redirect_uri: "postmessage",
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      data,
      { headers },
    );
    const {
      data: { refresh_token },
    } = response;

    if (refresh_token) return refresh_token;
    else return null;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const isAuthenticated = async () => {
  const data = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/auth/me");
  console.log(await data.json());
};
