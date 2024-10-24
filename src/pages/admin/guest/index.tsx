import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminGuest = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(6);
  }, []);

  return (
    <div>
      <h1>/admin/guest/:id</h1>
    </div>
  );
}
export default AdminGuest;
