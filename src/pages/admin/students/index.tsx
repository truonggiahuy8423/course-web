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
import './index.module.scss';

const AdminStudents = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(4);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>List Of Students</h1>
      <DataTable></DataTable>
      {/* <div className={styles.paginationContainer}>
        <Pagination
          onChangePage={(page) => {}}
          pageCount={10}
          activePage={1}
        ></Pagination>
      </div> */}
    </div>
  );
}
export default AdminStudents;
