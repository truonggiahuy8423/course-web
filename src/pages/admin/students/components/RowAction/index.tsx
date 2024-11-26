import {
  EllipsisOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "../../../../../states/loading";
import { useNavigate } from "react-router-dom";
import { StudentResponse } from "../../../../../interfaces/Student";

type Props = {
  student: StudentResponse;
  afterDone: () => void;
};


const RowAction = (props: Props) => {
  const { student, afterDone } = props;
  const setLoading = useSetRecoilState(loadingState);
  const navigate = useNavigate();

    
  const deleteStudent = (studentId: number) => {
    setLoading(true);
    // Xử lý xóa khóa học
    // Sau khi xóa xong thì gọi hàm afterDone
    // setLoading(false);
    confirm("Are you sure you want to delete this student?");
    toast.success("StudentResponse deleted successfully");
    afterDone();
  }

  const actions: MenuProps["items"] = [
    {
      key: "1",
      label: "View",
      icon: <EyeOutlined />,
      onClick: () => navigate(`/admin/student/${student.studentId}/infor`),
    },
    {
      key: "2",
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: () => deleteStudent(student.studentId),
    },
  ];

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: actions,
        }}
      >
        <Button>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default RowAction;
