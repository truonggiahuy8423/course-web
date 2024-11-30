
import styles from './index.module.scss'; // Đảm bảo sử dụng đúng phần mở rộng .scss
// components/TopNav.js
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../states/auth";
import { Link } from "react-router-dom";
import classNames from "classnames";

const Sidebar = () => {
  const userInfo = useRecoilValue(userState);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  let avatar = null;
  if (userInfo) {
    avatar = localStorage.getItem(userInfo.avatar);
    console.log(userInfo);
  }
  console.log(avatar);
  const avatarSrc =
    avatar !== "null" && avatar !== null
      ? `data:image/jpeg;base64,${avatar}`
      : "/img/avatar_blank.jpg";
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Thông tin các khóa học</h2>
      <input
        type="text"
        placeholder="Tìm kiếm khóa học, bài viết, video..."
        className={styles.searchInput}
      />
      {userInfo ? <> <span style={{marginRight: 20}}>Balance: {userInfo.balance? userInfo.balance.toLocaleString('vi-VN') : '0'}</span><div className={styles.dropDown} onClick={toggleProfile}>
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
              <p className={styles.roleName}>Student</p>
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
        )}</>: <div className={styles.btnContainer}>
        <button className={`${styles.btn} ${styles.signup}`}>Đăng ký</button>
        <button className={`${styles.btn} ${styles.loginBtn}`}>Đăng nhập</button>
      </div>}
      
      
    </div>
  );
};

export default Sidebar;