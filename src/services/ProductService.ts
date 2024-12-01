import { ApiResponse } from "../interfaces/ApiResponse";
import { getRequest, postRequest } from "../routes/middleware/fetch";
import { GetCourseCardResponse } from "../interfaces/CourseCard";

const apiUrl = "http://localhost:8080";
const token = localStorage.getItem("token");
export const getCourseCard = async (params?: any): Promise<ApiResponse<GetCourseCardResponse>> => {

  return getRequest<ApiResponse<GetCourseCardResponse>>({
    url: `${apiUrl}/cards`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    params: params,
  }).catch((e) => {
    throw new Error(
      e?.message || "Login failed/Network problem"
    );
  });
};

export const GetRecommendation = (
  request?: any // Nếu bạn muốn gửi dữ liệu đi trong body, tham số này sẽ được sử dụng
): Promise<ApiResponse<any>> => {
  return getRequest<ApiResponse<any>>({
    url: `${apiUrl}/get-recommendation`, // URL API
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Thêm header Authorization nếu có token
    },
  }).catch((e) => {
    throw new Error(
      e?.message || "Login failed/Network problem"
    );
  });
};
  