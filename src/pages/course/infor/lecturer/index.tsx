import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Course, Student } from "../../../../interfaces/Course";
import { useParams } from "react-router-dom";
import { getCourseDetailsById, getStudentsByCourseId } from "../../../../services/CourseService";
import { toast } from "react-toastify";
import Table from "../components/DetailTable";
import ComponentContainer from "../../../../components/ComponentContainer";
import Label from "../../../../components/Label";
import DataTable, { ColumnsType } from "../../../../components/DataTable2";
import ListLecturer from "../../../../components/ListLecturer";
import { useRecoilValue } from "recoil";
import { loadingState } from "../../../../states/loading";
import { userState } from "../../../../states/auth"; // Import user state
//import ChooseStudentModal from "./components/StudentModal";
import FormItem from "../../../../components/FormItem";
import { useForm } from "react-hook-form";

const LecturerCourseInfor = () => {
  const isLoading = useRecoilValue(loadingState); // Get loading state
  const user = useRecoilValue(userState); // Get user state
  const isLecturer = user?.role === "LECTURER"; // Check if the user is a student

  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      students: [],
    },
  });

  const [course, setCourse] = useState<Course>();
  const [students, setStudents] = useState<Student[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("6");
  const [sort, setSort] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");
  
  const columns: ColumnsType<Student>[] = [
    {
      title: "ID",
      dataIndex: "studentId",
      width: "20%",
      sorterField: "1",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "username",
      width: "50%",
      sorterField: "2",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "",
    },
  ];

  const { id } = useParams<{ id: string }>();
  console.log("Course ID:", id);

  // Fetch course details
  const getCourse = () => {
    getCourseDetailsById({ courseId: id })
      .then((res) => {
        setCourse(res.data);

        getStudentsByCourseId({ courseId: id })
          .then((res) => {
            setStudents(res.data.students);
            setTotal(res.data.total);
          })
          .catch((err) => {
            toast.error(err.message || "Failed to load students");
          });
      })
      .catch((err) => {
        toast.error(err.message || "Failed to load course");
      });
  };

  useEffect(() => {
    getCourse();
  }, []);

  // Handle loading state
  if (isLoading) {
    return <div className={styles.contentSection}>Loading...</div>;
  }

  // If the course is not found
  if (!course) {
    return <div className={styles.contentSection}>Course not found</div>;
  }

  if (!course) {
    return <div className={styles.contentSection}>Course not found</div>;
  }

  return (
    <div className={styles.contentSection}>
      <ComponentContainer justifyContent="left" padding={{ left: "20px", top: "20px" }}>
        <Label text="Information" fontSize="medium"></Label>
      </ComponentContainer>

      <ComponentContainer justifyContent="left" padding={{ left: "20px", top: "20px" }}>
        <Label text="Lecturers" fontSize="medium"></Label>
      </ComponentContainer>
      <ListLecturer lecturers={course ? course.lecturers : []} />

      <ComponentContainer justifyContent="left" padding={{ left: "20px", top: "20px" }}>
        <Label text="Students" fontSize="medium"></Label>
      </ComponentContainer>

      {/* Admin-only student management
      {isAdmin && (
        <FormItem>
          <ChooseStudentModal name="students" control={control} courseId={id || ""} />
        </FormItem>
      )} */}

      {/* Shared data table for both Admin and Student */}
      <DataTable<Student>
        dataSource={students}
        page={page}
        pageSize={pageSize}
        total={total}
        columns={columns}
      />
    </div>
  );
};

export default LecturerCourseInfor;
