import axios from "axios";

export type ErrorResponseBody = {
  errorMessage: string;
  errors: {
    field: string;
    value?: unknown;
    reason: string;
  }[];
};

const httpClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default httpClient;
