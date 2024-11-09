import {
    AccessControlRequest,
    AccessControlResponse,
  } from "../interfaces/AccessControl";
  import { ApiResponse } from "../interfaces/ApiResponse";
  import { LoginResponse } from "../interfaces/Auth";
import { StudentResponse } from "../interfaces/Student";
  import { LoginFormData } from "../pages/login";
  import { getRequest, postRequest } from "../routes/middleware/fetch";
  
  const apiUrl = import.meta.env.VITE_API_URL;
  
//   export const acquireAccessControl = async (
//     accessControlRequest: AccessControlRequest,
//   ): Promise<ApiResponse<AccessControlResponse>> => {
//     const token = localStorage.getItem("token");
//     console.log(token ? `Bearer  ${token}` : "");
  
//     return postRequest<ApiResponse<AccessControlResponse>, AccessControlRequest>({
//       url: `${apiUrl}/access-control`,
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${token || ""}`,
//         Authorization: (token ? `Bearer ${token}` : ""),
//       },
//       body: accessControlRequest,
//     }).catch((e) => {
//       throw new Error(
//         e?.message || "Access failed/Network problem"
//       );
//     });
//   };
  
  export const getAllStudents = (
  ): Promise<ApiResponse<StudentResponse>> => {
    const token = localStorage.getItem("token");
    console.log(token ? `Bearer  ${token}` : "");
    return getRequest<ApiResponse<StudentResponse>>({
      url: `${apiUrl}/api/students/all`,
      headers: {
        "Content-Type": "application/json",
        Authorization: (token ? `Bearer ${token}` : "")
      },
    }).catch((e) => {
      throw new Error(
        e?.message || "Login failed/Network problem"
      );
    });;
  };
  