import React, { useEffect, useState } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";
import style from "./index.module.scss";
import { useParams } from "react-router-dom";
import { getAdmin } from "../../../services/AdminService";

const AdminAdministrator = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: true,
    dob: [],
  });
  useEffect(() => {
    if (id) {
      setAdminNavigation(5);
      getAdmin({ id }).then(async (res) => {
        const data = await res.json();
        setFormData(data);
      });
    }
  }, [id]);
  return (
    <div className={style["view-container"]}>
      <div className={style["view-field"]}>
        <label>Username</label>
        <span>{formData.username}</span>
      </div>
      <div className={style["view-field"]}>
        <label>Email</label>
        <span>{formData.email}</span>
      </div>
      <div className={style["view-field"]}>
        <label>Phone</label>
        <span>{formData.phone}</span>
      </div>

      <div className={style["view-field"]}>
        <label>Gender</label>
        <span>{formData.gender ? "Male" : "Female"}</span>
      </div>
      <div className={style["view-field"]}>
        <label>Date of Birth</label>
        <span>{formData?.dob?.reverse().join("/") || "N/A"}</span>
      </div>
    </div>
  );
};

export default AdminAdministrator;
