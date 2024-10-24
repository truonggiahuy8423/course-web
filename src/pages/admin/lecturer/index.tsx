import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminLecturer = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(3);
  }, []);

  return (
    <div>
      <h1>/admin/lecturer/:id</h1>
    </div>
  );
}
export default AdminLecturer;
