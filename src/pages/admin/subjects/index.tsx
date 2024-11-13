import React, { useEffect, useState } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";
import { GetAllSubjects, AddSubject } from "../../../services/SubjectService";
import { Divider, Table, Button, Modal, Form, Input, message } from "antd";

type SubjectTable = {
  subjectId: number;
  subjectName: string;
  description: string;
};

const AdminSubjects: React.FC = () => {
  const [listSubject, setListSubject] = useState<SubjectTable[]>([]);
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    setAdminNavigation(2);
  }, []);

  const fetchSubjects = () => {
    GetAllSubjects()
      .then((res) => {
        setListSubject(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const handleSaveSubject = () => {
    const newSubject = {
      subjectName,
      description,
      categoryId: Number(categoryId),
    };

    AddSubject(newSubject)
      .then(() => {
        message.success("Subject added successfully!");
        setIsModalVisible(false); // Đóng modal sau khi thêm thành công
        fetchSubjects(); // Gọi lại API để lấy danh sách subjects mới nhất
        resetForm();
      })
      .catch((error) => {
        message.error("Failed to add subject!");
        console.error(error);
      });
  };

  const resetForm = () => {
    setSubjectName("");
    setDescription("");
    setCategoryId("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "subjectId",
      key: "subjectId",
      sorter: true,
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "subjectName",
      key: "subjectName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <span>
          <a>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];

  const data = listSubject.map((item) => ({
    key: item.subjectId,
    subjectId: item.subjectId,
    subjectName: item.subjectName,
    description: item.description,
  }));

  return (
    <div>
      <h1>Subject</h1>
      {/* Nút Add Subject */}
      <Button type="primary" onClick={handleAddSubject}>
        Add Subject
      </Button>

      {/* Bảng dữ liệu */}
      <Table columns={columns} dataSource={data} style={{ marginTop: 20 }} />

      {/* Modal để nhập thông tin subject mới */}
      <Modal
        title="Add New Subject"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSaveSubject}
        okText="Save"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Subject Name" required>
            <Input
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Description" required>
            <Input
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Category ID">
            <Input
              placeholder="Enter category ID"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminSubjects;
