import React, { useEffect, useState } from "react";
import AppLayout from "../../../layout/AppLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import AdminNavigation from "../../../components/AdminNavigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { adminNavigation } from "../../../states/adminNavigation";
import Pagination from "../../../components/Pagination";
import DataTable from "./components/DataTable";
import { styleText } from "util";
import styles from "./index.module.scss";
import Table, { ColumnsType } from "../../../components/DataTable";
import { getCourses } from "../../../services/CourseService";
import { loadingState } from "../../../states/loading";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import RowAction from "./components/RowAction";

export type Lecturer = {
  lecturerId: number;
  username: string;
  email: string;
  lastAccess: string;
  gender: boolean;
  avatar: string;
};

export type Subject = {
  subjectId: number;
  subjectName: string;
  description: string;
  createdDate: string;
  updatedDate: string;
};

export type Course = {
  courseId: number;
  createdDate: string;
  updatedDate: string;
  startDate: string;
  endDate: string;
  lecturers: Lecturer[];
  numberOfStudents: number;
  subject: Subject;
};

export type Props = {
  data: Course[];
};

// const defaultParams = {
//   page: 1,
//   pageSize: 10,
//   sort: "courseId",
//   sortDir: "asc",
// };

const AdminCourses = () => {
  const location = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const setLoading = useSetRecoilState(loadingState);
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(1);
  }, []);
  //   const queryParams = new URLSearchParams(location.search);
  //   queryParams.set("page", defaultParams.page.toString());
  //   queryParams.set("pageSize", defaultParams.pageSize.toString());
  //   queryParams.set("sort", defaultParams.sort);
  //   queryParams.set("sortDir", defaultParams.sortDir);
  //   const newUrl = `${location.pathname}?${queryParams.toString()}`;
  //   navigate(newUrl);
  // }, []);

  useEffect(() => {
    getCourseList();
  }, [location.search]);

  const columns: ColumnsType<Course>[] = [
    {
      title: "Course ID",
      dataIndex: "courseId",
      sorterField: "1",
      sorter: true,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sorterField: "2",
      sorter: true,
      render: (subject) => {
        return `${subject.subjectId}-${subject.subjectName}`;
      },
    },
    {
      title: "Lecturers",
      dataIndex: "lecturers",
      sorter: false,
      render: (lecturers) => {
        return lecturers
          .map((lecturer: Lecturer) => lecturer.username)
          .join(", ");
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorterField: "3",
      sorter: true,
      render: (startDate) => {
        return new Date(startDate).toLocaleDateString();
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      sorterField: "4",
      sorter: true,
      render: (endDate) => {
        return new Date(endDate).toLocaleDateString();
      },
    },
    {
      title: "Enrollment",
      dataIndex: "numberOfStudents",
      sorterField: "5",
      sorter: true,
    },
    {
      title: "",
      render: (_, record) => {
        return (
          <RowAction
            course={record}
            afterDone={() => getCourseList()}
          ></RowAction>
        );
      },
    },
  ];

  const getCourseList = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || "1";
    const pageSize = queryParams.get("pageSize") || "10";
    const sort = queryParams.get("sort") || "1";
    const sortDir = queryParams.get("sortDir") || "asc";

    // console.log(queryParams);

    const params = {
      page: Number(page),
      pageSize: Number(pageSize),
      sort,
      sortDir,
    };

    getCourses(params)
      .then(async (res) => {
        setCourses(res.data.courses);
        setTotal(res.data.total);
        toast.success("更新しました");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      })
      .catch(async (e) => {
        console.log(e);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>/admin/courses</h1>
      <Table
        columns={columns}
        dataSource={courses}
        total={total}
        onClickRow={(id) => {
          // router.push(`/admins/job/${id}`);
        }}
      />
    </div>
  );
};

export default AdminCourses;
