import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { adminNavigation } from "../../../states/adminNavigation";
import DataTable from "./components/DataTable";
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
