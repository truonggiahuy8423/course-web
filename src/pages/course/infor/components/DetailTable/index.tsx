// components/TopNav.js
import React, { ReactNode, useEffect, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Course, Subject } from "../../../../../interfaces/Course";
import classNames from "classnames";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  FormProps,
  Input,
  Modal,
  Select,
} from "antd";
import { getSubjectList } from "../../../../../services/CourseService";
import { toast } from "react-toastify";
import CustomDatePicker from "../../../../../components/CustomDatePicker";
import dayjs from "dayjs";
import axios from "axios";

type Props = {
  isAdmin: boolean;
  course?: Course;
};

const Table = (props: Props) => {
  // const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const { isAdmin, course } = props;
  //   const [course, setCourse] = useState<Course>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const getSubjects = async () => {
    // const queryParams = new URLSearchParams(location.search);

    const params = {
      page: 1,
      pageSize: 1000,
      sort: "",
      sortDir: "asc",
      search: "",
    };

    getSubjectList(params)
      .then(async (res) => {
        setSubjects(res.data.subjects);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    getSubjects();
  }, []);

  type FieldType = {
    subjectId?: string;
    startDate?: string;
    endDate?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await axios.put("http://localhost:8080/update-course", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { courseId: course?.courseId },
      });
      setOpenUpdateModal(false);
      window.location.reload();
    } catch (error) {}
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <table className={styles.classInforTable}>
      <tbody>
        <tr>
          <td>Course ID</td>
          <td>{course?.courseId.toString().padStart(6, "0")}</td>
        </tr>
        <tr>
          <td>Subject ID</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {course?.subject?.subjectId.toString().padStart(4, "0") || 1}
              <EditFilled
                onClick={() => {
                  setOpenUpdateModal(true);
                }}
                className={styles.icon}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Course name</td>
          <td>
            {course?.subject?.subjectName}-
            {course?.subject?.subjectId.toString().padStart(4, "0")}.
            {course?.courseId.toString().padStart(6, "0")}
          </td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {dayjs(course?.startDate).format("DD/MM/YYYY")}

              <EditFilled
                onClick={() => {
                  setOpenUpdateModal(true);
                }}
                className={styles.icon}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>End Date</td>
          <td className={styles.hidden}>
            <div className={styles.flex}>
              {dayjs(course?.endDate).format("DD/MM/YYYY")}
              <EditFilled
                onClick={() => {
                  setOpenUpdateModal(true);
                }}
                className={styles.icon}
              />
            </div>
          </td>
        </tr>
        {/* <tr>
            <td>Tổng số buổi</td>
            <td>@slbh</td>
        </tr>
        <tr>
            <td>Số buổi đã học</td>
            <td>@slbhdh</td>
        </tr> */}
        <tr>
          <td>Members</td>
          <td>{course?.numberOfStudents}</td>
        </tr>
        {/* <tr>
            <td>SL giảng viên</td>
            <td>@slgv</td>
        </tr> */}
      </tbody>
      <Modal
        title="edit course"
        footer={false}
        onClose={() => {
          setOpenUpdateModal(false);
        }}
        open={openUpdateModal}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, padding: 10 }}
          initialValues={{
            subjectId: course?.subject?.subjectId || 1,
            startDate: dayjs(course?.startDate),
            endDate: dayjs(course?.endDate),
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Subject"
            name="subjectId"
            rules={[{ required: true, message: "Please input your subject!" }]}
          >
            <Select
              options={subjects.map((v) => ({
                value: v.subjectId,
                label: v.subjectName,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="StartDate"
            name="startDate"
            rules={[{ required: true, message: "Please input start date !" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="EndDate"
            name="endDate"
            rules={[{ required: true, message: "Please input end date !" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item label={null}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </table>
  );
};

export default Table;
