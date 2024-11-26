// components/TopNav.js
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../states/auth";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { Link, Outlet } from "react-router-dom";
import { adminNavigationItems } from "../../data/adminNavigation";
// import { StudentNavigationItem } from "../../interfaces/StudentNavigationItem";
import { adminNavigation } from "../../states/adminNavigation";
import Button from "../../components/Button";
import { StudentDetailResponse } from "../../interfaces/Student";
import { getStudentById } from "../../services/StudentService";
import { toast } from "react-toastify";
import { ArrowLeftOutlined } from "@ant-design/icons";

type Props = {
  isAdmin: boolean;
};

const StudentLayout = (props: Props) => {
  // const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const {isAdmin} = props;
  const [student, setStudent] = useState<StudentDetailResponse>();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  console.log("Student ID:", id);

  const getStudent = () => {
    getStudentById({ studentId: id })
      .then((res) => {
        setStudent(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div>
      <div className={styles.headerContainer}>
        <h1>
          {student?.username} - {student?.studentId}
        </h1>
      </div>
      <div className={styles.gridLayout}>
        <div className={styles.menu}>
          <div className={styles.classInforSection}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="button"
                onClick={() => navigate("admin/students")}
                className={`${styles.classInforSectionBackBtn} ${styles.highlightButtonReverse}`}
              >
                <ArrowLeftOutlined />
              </Button>
            </div>
            <div>
              <h5 className={styles.classInforSectionClassName}>
                {/* {student?.subject.subjectName}-
                {student?.subject.subjectId.toString().padStart(4, "0")}.
                {student?.studentId.toString().padStart(6, "0")} */}
              </h5>
              <p style={{ fontSize: "13px", lineHeight: "16px" }}>
                Members:{" "}
                <span className={styles.classInforSectionMembersQuantity}>
                  hihi
                </span>
              </p>
              <p style={{ fontSize: "13px", lineHeight: "16px" }}>
                Start: hihi
              </p>
              <p style={{ fontSize: "13px", lineHeight: "16px" }}>
                End: hihi
              </p>
            </div>
          </div>
          <Link
            className={styles.item}
            to={`${isAdmin ? 'admin' : ''}/student/${student?.studentId}/infor`}
          >
            Student Information
          </Link>
          <Link
            className={styles.item}
            to={`${isAdmin ? 'admin' : ''}/student/${student?.studentId}/attendance`}
          >
            Attendance
          </Link>
          <Link
            className={styles.item}
            to={`${isAdmin ? 'admin' : ''}/student/${student?.studentId}/resource`}
          >
            Resource
          </Link>
          <Link className={styles.item} to={`${isAdmin ? 'admin' : ''}/student/${student?.studentId}/chat`}>
            Chat
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;
