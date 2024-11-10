import React, { useEffect, useState } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";
import styles from "./index.module.scss";
import { deleteAdmin, getAdmins } from "../../../services/AdminService";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const AdminAdministrators = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const [admins, setAdmins] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setAdminNavigation(5);
    getAdmins({ page: 0, size: 10 }).then(async (res) => {
      const data = await res.json();
      setAdmins(data.content);
    });
  }, [reload]);
  const navigate = useNavigate();
  console.log(admins);
  return (
    <div>
      <h1>/admin/administrators</h1>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Admin list</h2>
        <Button
          type="button"
          onClick={() => {
            navigate("/admin/administrators/create");
          }}
        >
          Add admin
        </Button>
      </div>
      <div style={{ marginTop: "50px" }} className={styles["wrap-table100"]}>
        <div className={styles["table100"]}>
          <table>
            <thead>
              <tr className={styles["table100-head"]}>
                <th className={styles["column1"]}>Username</th>
                <th className={styles["column2"]}>Email</th>
                <th className={styles["column3"]}>Phone</th>
                <th className={styles["column4"]}>Gender</th>
                <th className={styles["column5"]}>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((row: any) => (
                <tr>
                  <td className={styles["column1"]}>{row.username}</td>
                  <td className={styles["column2"]}>{row.email}</td>
                  <td className={styles["column3"]}>{row.phone}</td>
                  <td className={styles["column4"]}>
                    {row.gender ? "male" : "female"}
                  </td>
                  <td className={styles["column5"]}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                      }}
                    >
                      <button
                        onClick={() => {
                          navigate(`/admin/administrator/${row.userId}`);
                        }}
                        type="button"
                      >
                        view
                      </button>{" "}
                      <button
                        onClick={() => {
                          navigate(`/admin/administrator/${row.userId}/edit`);
                        }}
                        type="button"
                      >
                        edit
                      </button>{" "}
                      <button
                        onClick={async () => {
                          try {
                            const c = confirm("are you sure delete item?");
                            if (c) {
                              await deleteAdmin(row.userId);
                              setReload(!reload);
                            }
                          } catch (error) {}
                        }}
                        type="button"
                      >
                        delete
                      </button>{" "}
                    </div>{" "}
                  </td>
                </tr>
              ))}

              {/* Các dòng dữ liệu khác */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAdministrators;
