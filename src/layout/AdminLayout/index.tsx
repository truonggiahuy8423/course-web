// components/TopNav.js
import React, { ReactNode, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../states/auth";
import styles from "./index.module.scss";
import { Link, Outlet } from "react-router-dom";
import { adminNavigationItems } from "../../data/adminNavigation";
import { adminNavigation } from "../../states/adminNavigation";

type Props = {};

const AdminLayout = (props: Props) => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.leftNav}>
        <img className={styles.logo} src="/img/logo_course.png" alt="" />

        {adminNavigationItems.map((item) => (
          <Link className={item.id === itemId ? styles.highlight : ""} to={item.url}>
            {item.label}
        </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
