import { ApiResponse } from "../interfaces/ApiResponse";
import { Course, GetCoursesResponse, GetRoomsResponse, GetStudentsResponse, GetSubjectsResponse } from "../interfaces/Course";
import { GetLecturersResponse } from "../interfaces/Lecturer";
import { CourseCreateDTO } from "../pages/admin/courses/create";
// import { Course } from "../pages/admin/courses";
import { getRequest, postRequest } from "../routes/middleware/fetch";

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

export const getRoomList = async (params: any): Promise<ApiResponse<GetRoomsResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetRoomsResponse>>({
    url: `${apiUrl}/get-room-list`,
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

export const getStudentList = async (params: any): Promise<ApiResponse<GetStudentsResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetStudentsResponse>>({
    url: `${apiUrl}/get-student-list`,
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

// export const createCourse = async (params: any): Promise<ApiResponse<CourseCreateDTO>> => {
//   const token = localStorage.getItem("token");

//   return postRequest<ApiResponse<CourseCreateDTO>>({
//     body
//     url: `${apiUrl}/create-course`,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: (token ? `Bearer ${token}` : ""),
//     },
//     data: params,
//   }).catch((e) => {
//     throw new Error(
//       e?.message || "Access failed/Network problem"
//     )
//   });
// }

export const createCourse = (
  request: CourseCreateDTO,
): Promise<ApiResponse<any>> => {
  const token = localStorage.getItem("token");

  return postRequest<ApiResponse<any>, CourseCreateDTO>({    
    url: `${apiUrl}/create-course`,
    headers: {
      "Content-Type": "application/json",
      Authorization: (token ? `Bearer ${token}` : ""),
    },
    body: request,
  }).catch((e) => {
    throw new Error(
      e?.message || "Login failed/Network problem"
    );
  });;
};

export const getCourseById = async (params: any): Promise<ApiResponse<Course>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<Course>>({
    url: `${apiUrl}/get-course-by-id`,
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

export const getCourseDetailsById = async (params: any): Promise<ApiResponse<Course>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<Course>>({
    url: `${apiUrl}/get-course-details-by-id`,
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

export const getStudentsByCourseId = async (params: any): Promise<ApiResponse<GetStudentsResponse>> => {
  const token = localStorage.getItem("token");

  return getRequest<ApiResponse<GetStudentsResponse>>({
    url: `${apiUrl}/get-students-by-course-id`,
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
