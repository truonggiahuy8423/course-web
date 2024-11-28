import {
  EllipsisOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Modal } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loadingState } from "../../../../states/loading";
import { useNavigate } from "react-router-dom";
import { Course, GetCoursesResponse } from "../../../../interfaces/Course";

type Props = {
  course: Course;
  afterDone: () => void;
};


const RowAction = (props: Props) => {
  const { course, afterDone } = props;
  const setLoading = useSetRecoilState(loadingState);
  const navigate = useNavigate();

    
  const deleteCourse = (courseId: number) => {
    setLoading(true);
    // Xử lý xóa khóa học
    // Sau khi xóa xong thì gọi hàm afterDone
    // setLoading(false);
    confirm("Are you sure you want to delete this course?");
    toast.success("Course deleted successfully");
    afterDone();
  }

  const actions: MenuProps["items"] = [
    {
      key: "1",
      label: "View",
      icon: <EyeOutlined />,
      onClick: () => navigate(`/admin/course/${course.courseId}/infor`),
    },
    {
      key: "2",
      label: "Delete",
      icon: <DeleteOutlined />,
      onClick: () => deleteCourse(course.courseId),
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
