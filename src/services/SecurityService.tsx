import {
  AccessControlRequest,
  AccessControlResponse,
} from "../interfaces/AccessControl";
import { ApiResponse } from "../interfaces/ApiResponse";
import { LoginResponse } from "../interfaces/Auth";
import { LoginFormData } from "../pages/login";
import { getRequest, postRequest } from "../routes/middleware/fetch";

const apiUrl = import.meta.env.VITE_API_URL;

export const acquireAccessControl = async (
  accessControlRequest: AccessControlRequest,
): Promise<ApiResponse<AccessControlResponse>> => {
  const token = localStorage.getItem("token");
  console.log(token ? `Bearer  ${token}` : "");

  return postRequest<ApiResponse<AccessControlResponse>, AccessControlRequest>({
    url: `${apiUrl}/access-control`,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token || ""}`,
      Authorization: (token ? `Bearer ${token}` : ""),
    },
    body: accessControlRequest,
  }).catch((e) => {
    throw new Error(
      e?.message || "Access failed/Network problem"
    );
  });
};

export const loginByEmail = (
  request: LoginFormData,
): Promise<ApiResponse<LoginResponse>> => {
  return postRequest<ApiResponse<LoginResponse>, LoginFormData>({
    url: `${apiUrl}/login-by-email`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.parse(JSON.stringify(request)),
  }).catch((e) => {
    throw new Error(
      e?.message || "Login failed/Network problem"
    );
  });;
};
