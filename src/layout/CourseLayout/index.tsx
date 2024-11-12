// components/TopNav.js
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../states/auth";
import { useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { Link, Outlet } from "react-router-dom";
import { adminNavigationItems } from "../../data/adminNavigation";
import { CourseNavigationItem } from "../../interfaces/CourseNavigationItem";
import { adminNavigation } from "../../states/adminNavigation";
import Button from "../../components/Button";
import { Course } from "../../interfaces/Course";
import { getCourseById } from "../../services/CourseService";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";

type Props = {};

export const courseNavigationItem: CourseNavigationItem[] = [
  {
    id: 1,
    url: "/courses/infor",
    label: "Danh sách lớp học",
  },
  {
    id: 2,
    url: "/admin/subjects",
    label: "Môn học",
  },
  {
    id: 3,
    url: "/admin/lecturers",
    label: "Giảng viên",
  },
  {
    id: 4,
    url: "/admin/students",
    label: "Học viên",
  },
  {
    id: 5,
    url: "/admin/administrators",
    label: "Quản trị viên",
  },
  {
    id: 6,
    url: "/admin/guests",
    label: "Danh sách người dùng",
  },
];

const CourseLayout = (props: Props) => {
  // const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const [course, setCourse] = useState<Course>();

  const { id } = useParams<{ id: string }>();
  console.log("Course ID:", id);

  // console.log("Path var: " + pathVariable)
  // Get course
  const getCourse = () => {
    getCourseById({ courseId: id })
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1>
          {course?.subject.subjectName}-
          {course?.subject.subjectId.toString().padStart(4, "0")}.
          {course?.courseId.toString().padStart(6, "0")}
        </h1>
      </div>
      <div className={styles.gridLayout}>
        <div className={styles.menu}>
          <div className={styles.classInforSection}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="button"
                className={`${styles.classInforSectionBackBtn} ${styles.highlightButtonReverse}`}
              >
                <ArrowLeftOutlined />
              </Button>
            </div>
            <div>
              <h5 className={styles.classInforSectionClassName}>
                {course?.subject.subjectName}-
                {course?.subject.subjectId.toString().padStart(4, "0")}.
                {course?.courseId.toString().padStart(6, "0")}
              </h5>
              <p style={{ fontSize: "13px", lineHeight: "16px" }}>
                Members:{" "}
                <span className={styles.classInforSectionMembersQuantity}>
                  {course?.numberOfStudents}
                </span>
              </p>
              <p style={{ fontSize: "13px", lineHeight: "16px" }}>
                Start: {course?.startDate}
              </p>
              <p style={{ fontSize: "13px", lineHeight: "16px" }}>
                End: {course?.endDate}
              </p>
            </div>
          </div>
          <Link
            className={styles.item}
            to={`/course/${course?.courseId}/infor`}
          >
            Course Information
          </Link>
          <Link
            className={styles.item}
            to={`/course/${course?.courseId}/attendance`}
          >
            Attendance
          </Link>
          <Link
            className={styles.item}
            to={`/course/${course?.courseId}/resource`}
          >
            Resource
          </Link>
          <Link className={styles.item} to={`/course/${course?.courseId}/chat`}>
            Chat
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default CourseLayout;
