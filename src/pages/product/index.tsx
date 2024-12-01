import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { getCourseCard } from "../../services/ProductService"; // Đảm bảo import đúng service

const ProductDetail = () => {
  // const navigate = useNavigate();
  // const { id } = useParams(); // Lấy id từ URL params
  // const [course, setCourse] = useState(null); // State để lưu khóa học sau khi lấy từ API

  // // Lấy khóa học khi component được render lần đầu hoặc id thay đổi
  // useEffect(() => {
  //   getCourseCard().then((res) => {
  //     // Tìm khóa học có courseId bằng với id từ params
  //     const selectedCourse = res.find(
  //       (course: any) => course.courseId === parseInt(id)
  //     );
  //     if (selectedCourse) {
  //       setCourse(selectedCourse); // Cập nhật state với khóa học tìm được
  //     }
  //   });
  // }, [id]); // Khi id thay đổi, useEffect sẽ được gọi lại

  // if (!course) {
  //   return <div>Loading...</div>; // Hiển thị loading khi dữ liệu chưa được tải
  // }

  return (
    // <div style={{ height: "100vh", marginTop: "70px" }} className="container">
    //   <div className={styles.buttonGroup}>
    //     <button className={`${styles.button} ${styles.active}`}>
    //       <img
    //         src="/home.svg"
    //         width={25}
    //         className={`${styles.icon} home-icon`}
    //       />{" "}
    //       <span>Trang chủ</span>
    //     </button>
    //     <button
    //       onClick={() => {
    //         navigate("/course");
    //       }}
    //       className={styles.button}
    //     >
    //       <img
    //         src="/course.svg"
    //         width={25}
    //         className={`${styles.icon} router-icon`}
    //       />{" "}
    //       <span>Khoá học của tôi</span>
    //     </button>
    //     <button className={styles.button}>
    //       <img
    //         src="/post.svg"
    //         width={25}
    //         className={`${styles.icon} article-icon`}
    //       />{" "}
    //       <span>Bài viết</span>
    //     </button>
    //   </div>
    //   <div style={{ height: "80%" }} className="row">
    //     <div className="col-4">
    //       <img
    //         style={{ marginTop: "40px" }}
    //         src={course.thumbnail || "/default-thumbnail.png"} // Kiểm tra nếu không có ảnh thì dùng ảnh mặc định
    //         alt={course.subjectName}
    //         className={styles.courseImage}
    //       />
    //     </div>

    //     <div className="col-8 p-5">
    //       <h2 className={styles.courseName}>{course.subjectName}</h2>
    //       <h4 className={styles.coursePrice}>
    //         {course.price ? String(course.price) + 'đ' : "Chưa có giá"}
    //       </h4>
    //       <p className={styles.courseDetails}>
    //         <span className={styles.courseLabel}>Mô tả:</span>{" "}
    //         {course.description}
    //       </p>
    //       <p className={styles.courseDetails}>
    //         <span className={styles.courseLabel}>Số học viên:</span>{" "}
    //         {course.numberOfStudents} học viên
    //       </p>
    //       <div className={styles.metaInfo}>
    //         <div className={styles.authorInfo}>
    //           <img
    //             src="/user-profile.png"
    //             alt="author"
    //             className={styles.authorImg}
    //           />
    //           Giảng viên: <span>{course.author || "Chưa có giảng viên"}</span>
    //         </div>
    //         <span className={styles.courseStats}>
    //           <img src="/play.png" alt="author" className={styles.authorImg} />{" "}
    //           Số buổi học: {course.numberOfStudents}
    //         </span>
    //         <span className={styles.courseDuration}>
    //           <img src="/clock.png" alt="author" className={styles.authorImg} />{" "}
    //           Ngày bắt đầu: {course.startDate.join("/")}
    //         </span>
    //         <span className={styles.courseDuration}>
    //           <img src="/clock.png" alt="author" className={styles.authorImg} />{" "}
    //           Ngày kết thúc: {course.endDate.join("/")}
    //         </span>
    //       </div>
    //       <div className="mt-4">
    //         <h5>Thông tin Giảng viên</h5>
    //         <div className="d-flex gap-5">
    //           {course.lecturers ? (
    //             course.lecturers.map((lecturer, index) => (
    //               <div key={index}>
    //                 <p className={styles.courseDetails}>
    //                   <span className={styles.courseLabel}>Tên:</span>{" "}
    //                   {lecturer.name}
    //                 </p>
    //                 <p className={styles.courseDetails}>
    //                   <span className={styles.courseLabel}>Ngày sinh:</span>{" "}
    //                   {lecturer.birthDate}
    //                 </p>
    //                 <p className={styles.courseDetails}>
    //                   <span className={styles.courseLabel}>
    //                     Số năm kinh nghiệm:
    //                   </span>{" "}
    //                   {lecturer.experience} năm
    //                 </p>
    //               </div>
    //             ))
    //           ) : (
    //             <p className={styles.courseDetails}>Chưa có giảng viên</p>
    //           )}
    //         </div>
    //       </div>
    //       <div className="mt-5">
    //         <button className="btn btn-danger">Đăng ký học</button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <></>
  );
};

export default ProductDetail;
