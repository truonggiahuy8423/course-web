import React, { useEffect } from "react";
import { adminNavigation } from "../../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminSubjectsCreate = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(2);
  }, []);


  return (
    <div>
      <h1>/admin/subjects/create</h1>
    </div>
  );
}
export default AdminSubjectsCreate;
