import React, { useEffect, useState } from "react";
import AppLayout from "../../../layout/AppLayout";
import { Link, useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import AdminNavigation from "../../../components/AdminNavigation";
import { useRecoilState } from "recoil";
import { adminNavigation } from "../../../states/adminNavigation";
import Pagination from "../../../components/Pagination";
import DataTable from "./components/DataTable";
import { styleText } from "util";
import styles from './index.module.scss';


const AdminCourses = () => {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const varParam = queryParams.get("var"); // Lấy giá trị của 'var'
  // const [count, setCount] = useState(varParam ? Number(varParam) : 0);
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(1);
  }, []);

  return (
    <div>
      <h1>/admin/courses</h1>
      <DataTable></DataTable>
      <div className={styles.paginationContainer}>
        <Pagination
          onChangePage={(page) => {}}
          pageCount={10}
          activePage={1}
        ></Pagination>
      </div>
    </div>
  );
};

export default AdminCourses;
