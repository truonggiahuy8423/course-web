import React, { useEffect } from "react";
import { adminNavigation } from "../../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminCoursesCreate = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(1);
  }, []);

  return (
    <div>
      <h1>/admin/courses/create</h1>
    </div>
  );
};

export default AdminCoursesCreate;
