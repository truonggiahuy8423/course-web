import React, { useEffect } from "react";
import { adminNavigation } from "../../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminLecturersCreate = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(3);
  }, []);

  return (
    <div>
      <h1>/admin/lecturers/create</h1>
    </div>
  );
};

export default AdminLecturersCreate;
