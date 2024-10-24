import React, { useEffect } from "react";
import { adminNavigation } from "../../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminAdministratorsCreate = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(5);
  }, []);
  return (
    <div>
      <h1>/admin/administrators/create</h1>
    </div>
  );
};

export default AdminAdministratorsCreate;
