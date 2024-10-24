import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminSubjects = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(2);
  }, []);

  return (
    <div>
      <h1>/admin/subjects</h1>
    </div>
  );
}
export default AdminSubjects;
