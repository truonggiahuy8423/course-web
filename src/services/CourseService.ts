import { ApiResponse } from "../interfaces/ApiResponse";
import { GetCoursesResponse, GetSubjectsResponse } from "../interfaces/Course";
import { GetLecturersResponse } from "../interfaces/Lecturer";
// import { Course } from "../pages/admin/courses";
import { getRequest } from "../routes/middleware/fetch";

const apiUrl = import.meta.env.VITE_API_URL;

export const getCourses = async (params: any): Promise<ApiResponse<GetCoursesResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetCoursesResponse>>({
    url: `${apiUrl}/get-course-list`,
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

export const getLecturerList = async (params: any): Promise<ApiResponse<GetLecturersResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetLecturersResponse>>({
    url: `${apiUrl}/get-lecturer-list`,
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

export const getSubjectList = async (params: any): Promise<ApiResponse<GetSubjectsResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetSubjectsResponse>>({
    url: `${apiUrl}/get-subject-list`,
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