// components/TopNav.js
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/auth";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import classNames from "classnames";

const TopNav = () => {
  const userInfo = useRecoilValue(userState);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleNotification = () => {
    console.log("ok");
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
    setIsMessageOpen(false);
  };

  const toggleMessage = () => {
    setIsMessageOpen(!isMessageOpen);
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMessageOpen(false);
    setIsNotificationOpen(false);
  };

  let avatar = null;
  if (userInfo) {
    avatar = localStorage.getItem(userInfo.avatar);
  }
  const avatarSrc =
    avatar !== "null" && avatar !== null
      ? `data:image/png;base64,${avatar}`
      : "/img/avatar_blank.jpg";

  return (
    <div className={styles.topNav}>
      <Link className={classNames(styles.logo, styles.center)} to="/courses">
        <img src="/img/small_logo_course.png" alt="logo" />
      </Link>
      <div
        style={{
          marginRight: "10px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <button className={styles.notification} onClick={toggleNotification}>
          <img src="/img/bell_icon.png" alt="Notification Bell" />
        </button>
        {isNotificationOpen && (
          <div style={{ position: "relative" }}>
            <div className={styles.notificationPopup}></div>
          </div>
        )}
        <button className={styles.message} onClick={toggleMessage}>
          <img src="/img/message_icon.png" alt="Message Icon" />
        </button>
        {isMessageOpen && (
          <div style={{ position: "relative" }}>
            <div className={styles.messagePopup}></div>
          </div>
        )}
        <div className={styles.dropDown} onClick={toggleProfile}>
          <span className={styles.center}>
            <img className={styles.avatar} src={avatarSrc} alt="avatar" />
            <span className={styles.name}>{userInfo?.username}</span>
          </span>
          <img
            className={styles.icon}
            src="/img/caret_down.png"
            alt="dropdown icon"
          />
        </div>
        {isProfileOpen && (
          <div style={{ position: "relative" }}>
            <div className={styles.profilePopup}>
              <img className={styles.avatar} src={avatarSrc} alt="avatar" />
              <p className={styles.name}>{userInfo?.username}</p>
              <p className={styles.roleName}>Administrator</p>
              <Link to="/profile">
                Hồ sơ của tôi
              </Link>
              <Link to="/account-management">
                Quản lý tài khoản
              </Link>
              <Link to="/logout">
                Đăng xuất
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
