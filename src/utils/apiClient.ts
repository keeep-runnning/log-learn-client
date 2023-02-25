import axios, { isAxiosError } from "axios";

export type ApiFieldError = {
  field: string;
  value?: unknown;
  reason: string;
};

type ApiErrorResponse = {
  errorMessage: string;
  errors: ApiFieldError[];
};

export class ApiResponseError extends Error {
  readonly statusCode: number;
  readonly fieldErrors: ApiFieldError[];

  constructor(message: string, statusCode: number, fieldErrors: ApiFieldError[] = []) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.fieldErrors = fieldErrors;
  }
}

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError<ApiErrorResponse>(error) && error.response) {
      const {
        status,
        data: { errorMessage, errors },
      } = error.response;

      return Promise.reject(new ApiResponseError(errorMessage, status, errors));
    }

    return Promise.reject(error);
  }
);

export default apiClient;
