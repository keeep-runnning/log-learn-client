import axios, { isAxiosError } from "axios";

export type ApiFieldValidationResult = {
  field: string;
  value?: unknown;
  reason: string;
};

type ApiErrorResponse = {
  errorMessage: string;
  errors: ApiFieldValidationResult[];
};

export class ApiResponseError extends Error {
  readonly statusCode: number;
  readonly fieldValidationResults: ApiFieldValidationResult[];

  constructor(
    message: string,
    statusCode: number,
    fieldValidationResults: ApiFieldValidationResult[] = []
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.fieldValidationResults = fieldValidationResults;
  }
}

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
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
