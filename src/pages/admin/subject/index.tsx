import React, { useEffect } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";

const AdminSubject = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(2);
  }, []);

useEffect(() =>{
  
})

  return (
    <div>
      <h1>/admin/subject/:id</h1>
    </div>
  );
}
export default AdminSubject;
