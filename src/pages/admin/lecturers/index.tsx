import React, { useEffect, useState } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";
import { getListLecturer } from "../../../services/LectureService";
import { userState } from "../../../states/auth";
import Table, { ColumnsType } from "../../../components/DataTable";
import Button from "../../../components/Button";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

export type Lecturer = {
  lecturerId: number;
  username: string;
  email: string;
  phone: string;
  gender: boolean;
  dob: string;
  avatar: string;
};

const AdminLecturers = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const [lecturer, setLecturer] = useState<Lecturer[]>([]);

  useEffect(() => {
    setAdminNavigation(3);
  }, []);

  useEffect(() => {
    getLecturers();
  },[])

  const getLecturers = async () => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page") || "1";
    const pageSize = queryParams.get("pageSize") || "10";
    const sort = queryParams.get("sort") || "1";
    const sortDir = queryParams.get("sortDir") || "asc";
    const params = {
      page: Number(page),
      pageSize: Number(pageSize),
      sort,
      sortDir,
    };

    getListLecturer(params)
      .then(async (res) => {
        setLecturer(res.data.lecturers);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      })
      .catch(async (e) => {
        console.log(e);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      });
  };

  const columns: ColumnsType<Lecturer>[] = [
    {
      title: "Lecturer ID",
      dataIndex: "lecturerId",
      sorterField: "1",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "username",
      sorterField: "2",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (gender) => {
        return gender === true ? "Male" : "Female";
      },
    },
    {
      title: "Birth day",
      dataIndex: "dob",
    },
    // {
    //   title: "",
    //   render: (_, record) => {
    //     return (
    //       <RowAction
    //         course={record}
    //         afterDone={() => getCourseList()}
    //       ></RowAction>
    //     );
    //   },
    // },
  ];
  return (
    <div>
      <h1>Lecturers</h1>
      <Button
            type="button"
            color="primary"
            style={{
              borderRadius: "0px",
              height: "40px",
              // width: "40px",
              padding: "6px 16px",
            }}
          >
            <PlusOutlined />
            {/* New Course */}
          </Button>
      <Table
        columns={columns}
        dataSource={lecturer}
        total={lecturer.length}
        onClickRow={(id) => {
          // router.push(`/admins/job/${id}`);
        }}
      />
    </div>
  );
}

export default AdminLecturers;
