// components/TopNav.js
import React, { ReactNode, useEffect, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import styles from "./index.module.scss";
import { StudentDetailResponse } from "../../../../../interfaces/Student";
import classNames from "classnames";

type Props = {
  isAdmin: boolean;
  student?: StudentDetailResponse;
};

const Table = (props: Props) => {
  // const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const { isAdmin, student } = props;
  //   const [student, setStudent] = useState<Student>();

  return (
    <table className={styles.classInforTable}>
      <tbody>
      <tr>
        <td>Student ID</td>
        <td>{student?.studentId.toString().padStart(6, "0")}</td>
      </tr>
      <tr>
        <td>Student name</td>
        <td>
          {student?.username.toString().padStart(6, "0")}
        </td>
      </tr>
      </tbody>
    </table>
  );
};

export default Table;
