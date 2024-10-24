import React, { useEffect } from "react";
import { adminNavigation } from "../../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminStudentsCreate = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(4);
  }, []);
  
  return (
    <div>
      <h1>/admin/students/create</h1>
    </div>
  );
};

export default AdminStudentsCreate;
