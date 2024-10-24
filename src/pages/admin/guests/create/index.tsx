import React, { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { adminNavigation } from "../../../../states/adminNavigation";

const AdminGuestsCreate = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(6);
  }, []);

  return (
    <div>
      <h1>/admin/guests/create</h1>
    </div>
  );
};

export default AdminGuestsCreate;
