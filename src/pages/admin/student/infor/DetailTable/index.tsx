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
          <td>Subject ID</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {student?.subject.subjectId.toString().padStart(4, "0")}
              <EditFilled className={styles.icon} />
            </div>
          </td>
        </tr>
        <tr>
          <td>Student name</td>
          <td>
            {student?.subject.subjectName}-
            {student?.subject.subjectId.toString().padStart(4, "0")}.
            {student?.studentId.toString().padStart(6, "0")}
          </td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {student?.startDate}
              <EditFilled className={styles.icon} />
            </div>
          </td>
        </tr>
        <tr>
          <td>End Date</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {student?.endDate}
              <EditFilled className={styles.icon} />
            </div>
          </td>
        </tr>
        {/* <tr>
            <td>Tổng số buổi</td>
            <td>@slbh</td>
        </tr>
        <tr>
            <td>Số buổi đã học</td>
            <td>@slbhdh</td>
        </tr> */}
        <tr>
          <td>Members</td>
          <td>{student?.numberOfStudents}</td>
        </tr>
        {/* <tr>
            <td>SL giảng viên</td>
            <td>@slgv</td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default Table;
