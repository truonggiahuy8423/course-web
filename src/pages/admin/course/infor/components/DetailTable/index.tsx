// components/TopNav.js
import React, { ReactNode, useEffect, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Course } from "../../../../../../interfaces/Course";
import classNames from "classnames";

type Props = {
  isAdmin: boolean;
  course?: Course;
};

const Table = (props: Props) => {
  // const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const { isAdmin, course } = props;
  //   const [course, setCourse] = useState<Course>();

  return (
    <table className={styles.classInforTable}>
      <tbody>
        <tr>
          <td>Course ID</td>
          <td>{course?.courseId.toString().padStart(6, "0")}</td>
        </tr>
        <tr>
          <td>Subject ID</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {course?.subject.subjectId.toString().padStart(4, "0")}
              <EditFilled className={styles.icon} />
            </div>
          </td>
        </tr>
        <tr>
          <td>Course name</td>
          <td>
            {course?.subject.subjectName}-
            {course?.subject.subjectId.toString().padStart(4, "0")}.
            {course?.courseId.toString().padStart(6, "0")}
          </td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {course?.startDate}
              <EditFilled className={styles.icon} />
            </div>
          </td>
        </tr>
        <tr>
          <td>End Date</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {course?.endDate}
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
          <td>{course?.numberOfStudents}</td>
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
