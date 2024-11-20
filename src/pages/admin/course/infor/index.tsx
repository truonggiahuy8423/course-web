import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Course, Student } from "../../../../interfaces/Course";
import { useParams } from "react-router-dom";
import { getCourseDetailsById, getStudentsByCourseId } from "../../../../services/CourseService";
import { toast } from "react-toastify";
import Table from "./components/DetailTable";
import ComponentContainer from "../../../../components/ComponentContainer";
import Label from "../../../../components/Label";
import DataTable, {
  ColumnsType,
} from "../../../../components/DataTable2";
import ListLecturer from "../../../../components/ListLecturer";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "../../../../states/loading";
import ChooseStudentModal from "./components/StudentModal";
import FormItem from "../../../../components/FormItem";
import { CourseCreateFormData } from "../../courses/create";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const AdminCourseInfor = () => {
  // const {isAdmin} = props;
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CourseCreateFormData>({
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
  ]


  const { id } = useParams<{ id: string }>();
  console.log("Course ID:", id);

  // console.log("Path var: " + pathVariable)
  // Get course
  const getCourse = () => {
    setIsLoading(true);

    getCourseDetailsById({ courseId: id })
      .then((res) => {
        setCourse(res.data);
        // setStudents(res.data.students);
        getStudentsByCourseId({ courseId: id })
        .then((res) => {
          setStudents(res.data.students);
          setTotal(res.data.total);
          setIsLoading(false);
        }).catch((err) => {
          toast.error(err);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        toast.error(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCourse();
  }, []);

  if (isLoading) {
    return <div className={styles.contentSection}>Loading...</div>;
  }

  if (!course) {
    return <div className={styles.contentSection}>Course not found</div>;
  }

  return <div className={styles.contentSection}>

    <ComponentContainer justifyContent="left" padding={{left: "20px", top: "20px"}}>
      <Label text="Information" fontSize="medium"></Label>
    </ComponentContainer>
    <Table course={course} isAdmin/>
    <ComponentContainer justifyContent="left" padding={{left: "20px", top: "20px"}}>
      <Label text="Lecturers" fontSize="medium"></Label>
    </ComponentContainer>
    <ListLecturer lecturers={course ? course.lecturers : []}/>
    <ComponentContainer justifyContent="left" padding={{left: "20px", top: "20px"}}>
      <Label text="Students" fontSize="medium"></Label>
      
    </ComponentContainer>
    <FormItem>
    <ChooseStudentModal name="students" control={control} courseId={id || ""} />
    </FormItem>

    <DataTable<Student>
                dataSource={students}
                // paramsState={{
                //   setPage: setPage,
                //   setPageSize: setPageSize,
                //   setSort,
                //   setSortDir,
                //   setSearch,
                // }}
                page={page}
                pageSize={pageSize}
                total={total}
                columns={columns}
              />
  </div>;
};

export default AdminCourseInfor;
