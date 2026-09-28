import { ofetch } from "ofetch";

const apiClient = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

export default apiClient;
