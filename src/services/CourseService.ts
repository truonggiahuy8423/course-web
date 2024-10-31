import { ApiResponse } from "../interfaces/ApiResponse";
import { GetCoursesResponse } from "../interfaces/Course";
import { Course } from "../pages/admin/courses";
import { getRequest } from "../routes/middleware/fetch";

const apiUrl = import.meta.env.VITE_API_URL;

export const getCourses = async (params: any): Promise<ApiResponse<Course[]>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<Course[]>>({
    url: `${apiUrl}/get-courses`,
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