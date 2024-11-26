import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { adminNavigation } from "../../../states/adminNavigation";
import { loadingState } from "../../../states/loading";
import { toast } from "react-toastify";
import Table, { ColumnsType } from "../../../components/DataTable";
import { getLecturers, AddLecturer } from "../../../services/LecturerService"; // API để thêm giảng viên
import styles from "./index.module.scss";
import RowAction from "./components/RowAction";
import { Divider, Button, Modal, Form, Input, Select } from "antd";

// Kiểu dữ liệu cho Lecturer
export type Lecturer = {
  lecturerId: number;
  username: string;
  email: string;
  gender: string; // Đổi sang string để khớp với API
};

const AdminLecturers = () => {
  const location = useLocation();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [total, setTotal] = useState(0);
  const setLoading = useSetRecoilState(loadingState);
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State cho form
  const [lecturerName, setLecturerName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  // Mở modal thêm giảng viên
  const handleAddLecturer = () => {
    setIsModalVisible(true);
  };

  // Đóng modal và reset form
  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setLecturerName("");
    setEmail("");
    setGender("");
  };
  type Gender = "Male" | "Female";
  // Hàm lưu giảng viên mới
  const handleSaveLecturer = async () => {
    // Xác minh và ép kiểu gender
    if (gender !== "Male" && gender !== "Female") {
      toast.error("Invalid gender selected");
      return;
    }
  
    const newLecturer = {
      lecturerName,
      email,
      gender: gender as Gender, // Ép kiểu
    };
  
    try {
      setLoading(true);
      await AddLecturer(newLecturer); // Gọi API thêm giảng viên
      toast.success("Lecturer added successfully");
      fetchLecturers(); // Refresh danh sách giảng viên
      handleCancel(); // Đóng modal
    } catch (error) {
      console.error(error);
      toast.error("Failed to add lecturer");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    setAdminNavigation(3);
  }, []);

  useEffect(() => {
    fetchLecturers();
  }, [location.search]);

  // Cột dữ liệu
  const columns: ColumnsType<Lecturer>[] = [
    {
      title: "Lecturer ID",
      dataIndex: "lecturerId",
      sorterField: "1",
      sorter: true,
    },
    {
      title: "Username",
      dataIndex: "username",
      sorterField: "2",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorterField: "3",
      sorter: true,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: false,
      render: (gender) => gender ? "Male" : "Female", 
    },
    {
      title: "",
      render: (_, record) => {
        return (
          <RowAction
            lecturer={record}
            afterDone={() => fetchLecturers()}
          ></RowAction>
        );
      },
    },
  ];

  // Lấy danh sách giảng viên
  const fetchLecturers = async () => {
    setLoading(true);

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

    try {
      const res = await getLecturers(params);
      setLecturers(res.data.lecturers);
      setTotal(res.data.total);
      toast.success("Successfully fetched lecturers");
    } catch (e) {
      console.error(e);
      toast.error("Failed to fetch lecturers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>/admin/lecturers</h1>
      <Button type="primary" onClick={handleAddLecturer}>
        Add Lecturer
      </Button>
      <Divider />
      <Table
        columns={columns}
        dataSource={lecturers}
        total={total}
        onClickRow={(row) => {
          console.log(`Row clicked: ${row}`);
        }}
      />
      <Modal
        title="Add New Lecturer"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSaveLecturer}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Lecturer Name" required>
            <Input
              placeholder="Enter lecturer name"
              value={lecturerName}
              onChange={(e) => setLecturerName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Gender" required>
          <Select
            placeholder="Select gender"
            value={gender}
            onChange={(value) => setGender(value as Gender)} // Ép kiểu khi chọn
          >
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
          </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminLecturers;
