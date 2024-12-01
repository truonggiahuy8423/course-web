import React, { useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import { adminNavigation } from "../../states/adminNavigation";
import Pagination from "../../components/Pagination";
import DataTable from "./components/DataTable";
import { styleText } from "util";
import styles from "./index.module.scss";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "../../components/DataTable";
import { getCourses } from "../../services/CourseService";
import { loadingState } from "../../states/loading";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import RowAction from "./components/RowAction";
import ComponentContainer from "../../components/ComponentContainer";
import Input from "../../components/Input";
import SearchInput from "../../components/SearchInput";
import { Course, Lecturer } from "../../interfaces/Course";

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
  const setIsLoading = useSetRecoilState(loadingState);
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
      width: "8%",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sorterField: "2",
      sorter: true,
      render: (subject) => {
        return `${subject?.subjectId}-${subject?.subjectName}`;
      },
      width: "20%",
      // filters: [
      //   { text: '1-ReactJS', value: '1-ReactJS' },
      //   { text: '2-NextJS', value: '2-NextJS' },
      //   { text: '3-JS', value: '3-JS' },
      //   { text: '1-ReactJS', value: '1-ReactJS' },
      //   { text: '2-NextJS', value: '2-NextJS' },
      //   { text: '3-JS', value: '3-JS' },
      //   { text: '1-ReactJS', value: '1-ReactJS' },
      //   { text: '2-NextJS', value: '2-NextJS' },
      //   { text: '3-JS', value: '3-JS' },
      //   { text: '1-ReactJS', value: '1-ReactJS' },
      //   { text: '2-NextJS', value: '2-NextJS' },
      //   { text: '3-JS', value: '3-JS' },
      // ],
      // onFilter: (value, record) => record.subject.subjectName.includes(value),
    },
    {
      title: "Lecturers",
      dataIndex: "lecturers",
      sorter: false,
      render: (lecturers) => {
        return lecturers
          .map((lecturer: Lecturer) => lecturer?.username)
          .join(", ");
      },
      // width: '',
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      sorterField: "3",
      sorter: true,
      render: (startDate) => {
        return new Date(startDate).toLocaleDateString();
      },
      width: "15%",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      sorterField: "4",
      sorter: true,
      render: (endDate) => {
        return new Date(endDate).toLocaleDateString();
      },
      width: "15%",
    },
    {
      title: "Enrollment",
      dataIndex: "numberOfStudents",
      sorterField: "5",
      sorter: true,
      width: "8%",
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
      width: "10%",
    },
  ];

  const getCourseList = async () => {
    setIsLoading(true);

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

    console.log(params);

    getCourses(params)
      .then(async (res) => {
        setCourses(res.data.courses);
        setTotal(res.data.total);
        toast.success("Successful get courses");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      })
      .catch(async (e) => {
        console.log(e);
        toast.error("Failed to get courses");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h3>Course List</h3>
      <ComponentContainer justifyContent="right" padding={{ bottom: "10px" }}>
        <>
          {" "}
          <SearchInput placeholder="Enter course ID" />
          <Button
            type="button"
            color="primary"
            style={{
              borderRadius: "0px",
              height: "40px",
              // width: "40px",
              marginRight: "4px",
              // marginLeft: "1px",
              padding: "6px 16px",
            }}
          >
            <SearchOutlined />
          </Button>
          <Button
            type="button"
            color="primary"
            style={{
              borderRadius: "0px",
              height: "40px",
              // width: "40px",
              padding: "6px 16px",
            }}
            onClick={() => {
              navigate("/admin/courses/create");
            }}
          >
            <PlusOutlined />
            {/* New Course */}
          </Button>
        </>
      </ComponentContainer>
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
