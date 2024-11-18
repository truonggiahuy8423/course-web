import React from "react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/product/${course.id}`);
      }}
      className={styles.card}
    >
      <div
        className={styles.cardHeader}
        style={{ backgroundImage: `url(${course.image})` }}
      >
        {/* <h5 className={styles.courseTitle}>{course.title}</h5>
        <p className={styles.courseSubtitle}>{course.subtitle}</p> */}
      </div>
      <div className={styles.cardBody}>
        <p className={styles.courseName}>{course.name}</p>
        <div className={styles.coursePricing}>
          <span className={styles.newPrice}>{course.price}đ</span>
        </div>
        <div className={styles.courseDetails}>
          <div className={styles.authorInfo}>
            <img
              src="/user-profile.png"
              alt="author"
              className={styles.authorImg}
            />
            <span>{course.userCount}</span>
          </div>
          <span className={styles.courseStats}>
            <img src="/play.png" alt="author" className={styles.authorImg} />{" "}
            {course.views}
          </span>
          <span className={styles.courseDuration}>
            <img src="/clock.png" alt="author" className={styles.authorImg} />{" "}
            {course.startAt}
          </span>
        </div>
      </div>
    </div>
  );
};

const courses = [
  {
    id: 1,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/7.png",
    description: "Cho người mới bắt đầu",
    name: "HTML CSS Pro",
    price: "1.299.000",
    userCount: "20000",
    views: 590,
    startAt: "22/9/2024",
  },
  {
    id: 2,
    image:
      "https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png",
    description: "The Frontend Developer",
    name: "Ngôn ngữ Sass",
    price: "299.000",
    userCount: "200",
    views: 27,
    startAt: "22/9/2024",
  },
  {
    id: 3,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png",
    description: "Cho người mới bắt đầu",
    name: "JavaScript Pro",
    price: "1.399.000",
    userCount: "30000",
    views: 139,
    startAt: "22/9/2024",
  },
  {
    id: 4,
    image: "https://files.fullstack.edu.vn/f8-prod/courses/2.png",
    description: "Cho người mới bắt đầu",
    name: "JavaScript Pro",
    price: "1.399.000",
    userCount: "30000",
    views: 139,
    startAt: "22/9/2024",
  },
];

function ListProduct() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="row">
        <div className="col-1">
          {" "}
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
        </div>
        <div className="col-11">
          <div style={{ paddingTop: "200px" }}>
            <div className="d-flex flex-wrap justify-content-center">
              {courses.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
