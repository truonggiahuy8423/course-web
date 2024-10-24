import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminStudent = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(4);
  }, []);

  return (
    <div>
      <h1>/admin/student/:id</h1>
    </div>
  );
}
export default AdminStudent;
