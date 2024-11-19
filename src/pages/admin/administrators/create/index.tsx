import React, { useEffect, useState } from "react";
import { adminNavigation } from "../../../../states/adminNavigation";
import { useRecoilState } from "recoil";
import styles from "./index.module.scss";
import { createAdmin } from "../../../../services/AdminService";
import { useNavigate } from "react-router-dom";
const AdminAdministratorsCreate = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: true,
    dob: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Form data:", formData);
    createAdmin(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) navigate("/admin/administrators");
        else {
          alert("An error occurred, please check your input again");
        }
      })
      .catch((error) => {});
  };

  return (
    <div className={styles["form-container"]}>
      <div style={{ marginBottom: "50px" }}>
        <h3>Create admin</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-field"]}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-field"]}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-field"]}>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-field"]}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-field"]}>
          <label>Gender</label>
          <input
            type="checkbox"
            name="gender"
            checked={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-field"]}>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
        <div className={styles["form-field"]}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AdminAdministratorsCreate;
