import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminStudents = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(4);
  }, []);

  return (
    <div>
      <h1>/admin/students</h1>
    </div>
  );
}
export default AdminStudents;
