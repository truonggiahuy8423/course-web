import React, { useEffect, useState } from "react";
import { ApiResponse } from "../../interfaces/ApiResponse";
import {
  AccessControlRequest,
  AccessControlResponse,
} from "../../interfaces/AccessControl";
import { acquireAccessControl } from "../../services/SecurityService";
import { useLocation, useNavigate } from "react-router-dom";

const AccessControl = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null); // State để lưu thông báo lỗi
  const [loading, setLoading] = useState<boolean>(true); // State để kiểm soát quá trình tải
  const [hasAccess, setHasAccess] = useState<boolean>(false); // State để lưu quyền truy cập
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const accessControlRequest: AccessControlRequest = {
      url: location.pathname,
    };

    // Gọi hàm acquireAccessControl
    acquireAccessControl(accessControlRequest)
      .then((res: ApiResponse<AccessControlResponse>) => {
        if (res.data.status === 1) {
          // ok
          setHasAccess(true); // Người dùng có quyền truy cập
          setError("");
        } else if (res.data.status === 3) {
          // redirect
          setHasAccess(true); // Người dùng có quyền truy cập
          // setError("");
          navigate(res.data.redirectUrl);
        } else if (res.data.status === 4) {
          // not exist
          setError("Failed to acquire access control data: " + res.data.message);
        } else {
          // denied
          setError("You do not have access to this resource.");
        }
      })
      .catch((e) => {
        setError("Failed to acquire access control data: " + e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.pathname]);

  // Nếu đang trong quá trình tải
  if (loading) {
    return <div>Loading...</div>;
  }

  // Kiểm tra lỗi hoặc quyền truy cập
  if (error || !hasAccess) {
    return <div>{error || "Access denied."}</div>; // Hiển thị thông báo lỗi hoặc từ chối truy cập
  }

  // Nếu không có lỗi và người dùng có quyền truy cập
  return <>{children}</>;
};

export default AccessControl;
