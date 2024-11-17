import { ApiResponse } from "../interfaces/ApiResponse";
import { GetLecturersResponse } from "../interfaces/Lecturer";
import { getRequest, postRequest } from "../routes/middleware/fetch";
import { deleteRequest } from "../routes/middleware/fetch";

const apiUrl = "http://localhost:8080";
const token = localStorage.getItem("token");
export const getLecturers = async (params: any): Promise<ApiResponse<GetLecturersResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetLecturersResponse>>({
    url: `${apiUrl}/get-lectures`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    params: params,
  }).catch((e) => {
    throw new Error(e?.message || "Access failed/Network problem");
  });
};


export const deleteLecturers = async (lecturerId: number): Promise<ApiResponse<any>> => {


  return deleteRequest<ApiResponse<any>>({
    url: `${apiUrl}/delete-lecturer/${lecturerId}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).catch((e) => {
    throw new Error(e?.message || "Failed to delete lecturer");
  });
};



export type Gender = "Male" | "Female";

export const AddLecturer = (
  request: { lecturerName: string; email: string; gender: Gender } // Sử dụng kiểu cụ thể
): Promise<ApiResponse<any>> => {
  return postRequest<ApiResponse<any>, any>({
    url: `${apiUrl}/addLecturers`, 
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: {
      user: { // Đảm bảo payload có đối tượng `user`
        username: request.lecturerName, 
        email: request.email,
        gender: request.gender === "Male" ? false : true, // Male -> false, Female -> true
      },
    },
  }).catch((e) => {
    throw new Error(
      e?.message || "Failed to add lecturer / Network problem"
    );     
  });
};
