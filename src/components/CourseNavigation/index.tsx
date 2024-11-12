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
        <Link className="item1" to="/admin/courses">
          Danh sách lớp học
        </Link>

        <Link className="item2" to="/admin/lecturers">
          Giảng viên
        </Link>

        <Link className="item3" to="/admin/students">
          Học viên
        </Link>

        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
        <Link className="item4" to="/admin/users">
          User
        </Link>

        <Link className="item5" to="/admin/subjects">
          Môn học
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AdminNavigation;
