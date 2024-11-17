import { ApiResponse } from "../interfaces/ApiResponse";
import { GetLecturerResponse } from "../interfaces/Lecturer";
import { getRequest } from "../routes/middleware/fetch";

const apiUrl = import.meta.env.VITE_API_URL;

export const getListLecturer = async (params: any): Promise<ApiResponse<GetLecturerResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetLecturerResponse>>({
    url: `${apiUrl}/get-all-lecturer`,
    headers: {
      "Content-Type": "application/json",
      Authorization: (token ? `Bearer ${token}` : ""),
    },
    params: params,
  }).catch((e) => {
    throw new Error(
      e?.message || "Access failed/Network problem"
    );
  });
};