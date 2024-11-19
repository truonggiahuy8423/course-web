// components/TopNav.js
import React, { ReactNode, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/auth";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const AdminNavigation = (props: Props) => {
  const { children } = props;

  const userInfo = useRecoilValue(userState);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.leftNav}>
          <img className={styles.logo} src="/img/logo_course.png" alt="" />
        <a className="item1" href="/admin/courses">
          Danh sách lớp học
        </a>
        <a className="item2" href="/admin/lecturers">
          Giảng viên
        </a>

        <a className="item3" href="/admin/students">
          Học viên
        </a>

        <a className="item4" href="/admin/users">
          User
        </a>

        <a className="item5" href="/admin/subjects">
          Môn học
        </a>
      </div>
      {children}
    </div>
  );
};

export default AdminNavigation;
