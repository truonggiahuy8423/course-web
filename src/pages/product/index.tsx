import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const course = {
  id: 1,
  image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
  description: "Cho người mới bắt đầu",
  name: "HTML CSS Pro",
  price: "1.299.000",
  userCount: "20000",
  views: 50,
  startAt: "22/9/2024",
  endAt: "20/10/2025",
  teacher: [
    {
      name: "Huỳnh Tấn Phát",
      birthDate: "01/01/1980",
      experience: 10,
    },
  ],
};
const ProductDetail = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: "100vh", marginTop: "70px" }} className=" container">
      <div className={styles.buttonGroup}>
        <button className={`${styles.button} ${styles.active}`}>
          <img
            src="/home.svg"
            width={25}
            className={`${styles.icon} home-icon`}
          />{" "}
          <span>Trang chủ</span>
        </button>
        <button
          onClick={() => {
            navigate("/course");
          }}
          className={styles.button}
        >
          <img
            src="/course.svg"
            width={25}
            className={`${styles.icon} router-icon`}
          />{" "}
          <span>Khoá học của tôi</span>
        </button>
        <button className={styles.button}>
          <img
            src="/post.svg"
            width={25}
            className={`${styles.icon} article-icon`}
          />{" "}
          <span>Bài viết</span>
        </button>
      </div>
      <div style={{ height: "80%" }} className="row">
        <div className="col-4">
          <img
            style={{ marginTop: "40px" }}
            src={course.image}
            alt={course.name}
            className={styles.courseImage}
          />
        </div>

        <div className="col-8 p-5">
          <h2 className={styles.courseName}>{course.name}</h2>
          <h4 className={styles.coursePrice}>{course.price}đ</h4>
          <p className={styles.courseDetails}>
            <span className={styles.courseLabel}>Mô tả:</span>{" "}
            {course.description}
          </p>
          <p className={styles.courseDetails}>
            <span className={styles.courseLabel}>Số học viên:</span>{" "}
            {course.userCount} học viên
          </p>
          <div className={styles.metaInfo}>
            <div className={styles.authorInfo}>
              <img
                src="/user-profile.png"
                alt="author"
                className={styles.authorImg}
              />
              Số học viên: <span>{course.userCount}</span>
            </div>
            <span className={styles.courseStats}>
              <img src="/play.png" alt="author" className={styles.authorImg} />{" "}
              Số buổi học: {course.views}
            </span>
            <span className={styles.courseDuration}>
              <img src="/clock.png" alt="author" className={styles.authorImg} />{" "}
              Ngày bắt đầu: {course.startAt}
            </span>
            <span className={styles.courseDuration}>
              <img src="/clock.png" alt="author" className={styles.authorImg} />{" "}
              Ngày kết thúc: {course.endAt}
            </span>
          </div>
          <div className="mt-4">
            <h5>Thông tin Giảng viên</h5>
            <div className="d-flex gap-5">
              <p className={styles.courseDetails}>
                <span className={styles.courseLabel}>Tên:</span>{" "}
                {course.teacher[0].name}
              </p>
              <p className={styles.courseDetails}>
                <span className={styles.courseLabel}>Ngày sinh:</span>{" "}
                {course.teacher[0].birthDate}
              </p>
              <p className={styles.courseDetails}>
                <span className={styles.courseLabel}>Số năm kinh nghiệm:</span>{" "}
                {course.teacher[0].experience} năm
              </p>
            </div>
          </div>
          <div className="mt-5">
            <button className="btn btn-danger">Đăng ký học</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
