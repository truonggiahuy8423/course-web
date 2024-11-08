import { ErrorResponse } from "../interfaces/ErrorResponse";

export function errorFilter (error: ErrorResponse) {
  if (error?.errorCode === 10002) {
    window.location.href = "/login";
  }
  throw new Error(
    error?.errorMessage?.toString() || "Network error"
  );
}