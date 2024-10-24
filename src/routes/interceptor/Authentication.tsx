import React from "react";
import { Navigate } from "react-router-dom";


// Component PrivateRoute để kiểm tra token
const Authentication = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  // Nếu không có token, chuyển hướng đến trang login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Nếu có token, cho phép truy cập vào route
  return children;
};

export default Authentication;
