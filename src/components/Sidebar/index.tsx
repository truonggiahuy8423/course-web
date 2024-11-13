import React from 'react';
import styles from './index.module.scss'; // Đảm bảo sử dụng đúng phần mở rộng .scss

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Thông tin các khóa học</h2>
      <input
        type="text"
        placeholder="Tìm kiếm khóa học, bài viết, video..."
        className={styles.searchInput}
      />
      <div className={styles.btnContainer}>
        <button className={`${styles.btn} ${styles.signup}`}>Đăng ký</button>
        <button className={`${styles.btn} ${styles.loginBtn}`}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Sidebar;