import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminAdministrator = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(5);
  }, []);
  return (
    <div>
      <h1>/admin/administrator/:id</h1>
    </div>
  );
}

export default AdminAdministrator;
