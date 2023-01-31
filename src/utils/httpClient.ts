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
  baseURL: "http://localhost:8080",
});

export default httpClient;
