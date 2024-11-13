import { ApiResponse } from "../interfaces/ApiResponse";
import { getRequest, postRequest } from "../routes/middleware/fetch";

const apiUrl = "http://localhost:8080";
const token = localStorage.getItem("token");
console.log(token)
export const GetAllSubjects = (
    request?: any,
  ): Promise<ApiResponse<any>> => {
    return getRequest<ApiResponse<any>>({
      url: `${apiUrl}/api/subjects`,
      headers: {
        "Content-Type": "application/json",
        Authorization: (token ? `Bearer ${token}` : ""),
      }
    }).catch((e) => {
      throw new Error(
        e?.message || "Login failed/Network problem"
      );
    });;
  };


export const AddSubject = (
  request: { subjectName: string; description: string; categoryId: number }
): Promise<ApiResponse<any>> => { // Chỉ truyền một kiểu vào ApiResponse
  return postRequest<ApiResponse<any>, any>({ // Chỉ truyền một kiểu vào ApiResponse
    url: `${apiUrl}/api/subjects`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Chèn token nếu có
    },
    body: {
      subjectName: request.subjectName,
      description: request.description,
      categoryId: request.categoryId,
    },
  }).catch((e) => {
    throw new Error(
      e?.message || "Failed to add subject / Network problem"
    );     
  });
};