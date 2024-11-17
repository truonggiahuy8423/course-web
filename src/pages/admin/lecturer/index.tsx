import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

export type lecturer = {
  lecturerId: number;
  username: string;
  email: string;
  gender: boolean;
};
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
