import { ApiResponse } from "../interfaces/ApiResponse";
import { getRequest, postRequest } from "../routes/middleware/fetch";

const apiUrl = "http://localhost:8080";
const token = localStorage.getItem("token");
console.log(token)
export const GetCourseCard = (
  request?: any // Nếu bạn muốn gửi dữ liệu đi trong body, tham số này sẽ được sử dụng
): Promise<ApiResponse<any>> => {
  return postRequest<ApiResponse<any>, any>({
    url: `${apiUrl}/cards`, // URL API
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Thêm header Authorization nếu có token
    },
    body: request, // Gửi dữ liệu trong body nếu có
  }).catch((e) => {
    throw new Error(
      e?.message || "Login failed/Network problem"
    );
  });
};
  