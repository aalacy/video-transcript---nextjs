import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const fetcher = (url) =>
  fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

export const swrUpdater = async (url, { arg }) => {
  await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
};

export const useSwrFetcher = (url) => {
  return useSWR(url, fetcher, {
    onError: (error, key) => {
      if (error.status !== 403 && error.status !== 404) {
        toast.error(error.message);
      }
    },
  });
};

export const useSwrUpdater = (url) => {
  return useSWRMutation(url, swrUpdater);
};
