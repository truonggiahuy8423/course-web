import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { StudentDetailResponse } from "../../../interfaces/Student";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../../services/StudentService";
import { toast } from "react-toastify";
import Table from "./infor/DetailTable";
import ComponentContainer from "../../../components/ComponentContainer";
import Label from "../../../components/Label";
import DataTable, {
  ColumnsType,
} from "../../../components/DataTable2";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "../../../states/loading";

const AdminStudentInfor = () => {
  // const {isAdmin} = props;
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const [student, setStudent] = useState<StudentDetailResponse>();
  const [students, setStudents] = useState<StudentDetailResponse[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("6");
  const [sort, setSort] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");
  const columns: ColumnsType<StudentDetailResponse>[] = [
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
  console.log("Student ID:", id);

  // console.log("Path var: " + pathVariable)
  // Get student
  

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = () => {
    setIsLoading(true);

    getStudentById({ studentId: id })
      .then((res) => {
        setStudent(res.data);
        // setStudents(res.data.students);
      }).catch((err) => {
          toast.error(err);
          setIsLoading(false);
        });
      };

  // if (isLoading) {
  //   return <div className={styles.contentSection}>Loading...</div>;
  // }

  // if (!student) {
  //   return <div className={styles.contentSection}>Student not found</div>;
  // }

  return <div className={styles.contentSection}>

    <ComponentContainer justifyContent="left" padding={{left: "20px", top: "20px"}}>
      <Label text="Information" fontSize="medium"></Label>
    </ComponentContainer>
    <Table student={student} isAdmin/>
    <ComponentContainer justifyContent="left" padding={{left: "20px", top: "20px"}}>
      <Label text="Lecturers" fontSize="medium"></Label>
    </ComponentContainer>

    <ComponentContainer justifyContent="left" padding={{left: "20px", top: "20px"}}>
      <Label text="Students" fontSize="medium"></Label>
    </ComponentContainer>
    <DataTable<StudentDetailResponse>
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

export default AdminStudentInfor;
