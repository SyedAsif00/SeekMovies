"use client";
import defaultAxios from "axios";

const axios = defaultAxios.create({
  baseURL: process.env.NEXT_PUBLIC_OMDB_BASE_URL!,
  params: {
    apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY!,
  },
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  // any code here will run if the req is made, and it happens before the api can be called
  // in this the configs are directly returned,  but we can use it for many powerful processes like throttling, auth and others.
  (config) => config,
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  // here at this case, when the responese is received these code here will run, in this case we are returning the config as response.
  (response) => response,
  (error) => Promise.reject(error)
);
export default axios;
