import axios from "axios";

// Talks to /api/* on the CareerPilot backend — same contract the Flutter
// app uses (see AppConstants.baseUrl + the services/ layer in lib/).
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ai-careerpilot-pjrd.vercel.app/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 35000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("cp_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Every endpoint responds with { success, data } or { success: false, error }.
// Unwrap that here so pages just get the data or a thrown Error with a
// friendly .message (and .code for anything that wants to branch on it).
api.interceptors.response.use(
  (res) => res.data?.data ?? res.data,
  (err) => {
    const apiError = err.response?.data?.error;
    const message =
      apiError?.message ||
      (err.code === "ECONNABORTED" ? "The request timed out. Please try again." : null) ||
      (!err.response ? "Couldn't reach the server. Check your connection and try again." : null) ||
      "Something went wrong. Please try again.";
    const wrapped = new Error(message);
    wrapped.code = apiError?.code;
    wrapped.status = err.response?.status;
    return Promise.reject(wrapped);
  }
);

export default api;
