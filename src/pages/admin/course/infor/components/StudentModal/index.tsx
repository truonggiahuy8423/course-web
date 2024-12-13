import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
// import Button from "../../../../../../components/Button";
import { EditOutlined } from "@ant-design/icons";
import DataTable, {
  ColumnsType,
} from "../../../../../../components/DataTable2";
import ComponentContainer from "../../../../../../components/ComponentContainer";
import Label from "../../../../../../components/Label";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../../../../../states/loading";
import {
  getStudentsByCourseId,
  getStudentList,
  updateStudentInCourses,
  getStudentsNotPageable,
} from "../../../../../../services/CourseService";
import { toast } from "react-toastify";
import { Student } from "../../../../../../interfaces/Course";

type Props = {
  name: string;
  control: any;
  courseId: string;
  onModalClose?: () => void;
};

export const ChooseStudentModal = (prop: Props) => {
  const { name, control, courseId } = prop;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setIsLoading = useSetRecoilState(loadingState);

  const handleCancel = () => {
    console.log("handleCancel called");
    setIsModalVisible(false);
  };

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [tempList, setTempList] = useState<Student[]>([]); // Picked students
          const [students, setStudents] = useState<Student[]>([]); // Available students
          const [total, setTotal] = useState(0);
          const [page, setPage] = useState("1");
          const [pageSize, setPageSize] = useState("6");
          const [sort, setSort] = useState("");
          const [sortDir, setSortDir] = useState("asc");
          const [search, setSearch] = useState("");
          const [fullStudent, setFullStudent] = useState<Student[]>([]);
          const [students2, setStudents2] = useState<Student[]>([]);
          const [total2, setTotal2] = useState(0);
          const [page2, setPage2] = useState("1");
          const [pageSize2, setPageSize2] = useState("6");

          const columns2: ColumnsType<Student>[] = [
            {
              title: "ID",
              dataIndex: "studentId",
              width: "20%",
            },
            {
              title: "Name",
              dataIndex: "username",
              width: "50%",
            },
            {
              title: "Email",
              dataIndex: "email",
              width: "",
            },
          ];

          const fetchPickedStudents = async () => {
            const params = {
              page2: Number(page2),
              pageSize2: Number(pageSize2),
              sort,
              sortDir,
              search,
              courseId,
            };
            try {
              const res = await getStudentsByCourseId(params);

              setTempList(res.data.students);
              setTotal2(res.data.total);
              console.log("TempList from API:", res.data.students);
            } catch (err) {
              toast.error("Failed to fetch picked students");
            }
          };
          const fetchFullStudentList = async () => {
            const params = {
              courseId,
            };
            try {
              const res: any = await getStudentsNotPageable(params); // Gọi API với chỉ courseId
              setFullStudent(res.data); // Set danh sách sinh viên vào fullStudent
              console.log("API Response:", res.data);
              console.log(fullStudent);
            } catch (err) {
              toast.error("Failed to fetch full student list");
            }
          };

          const fetchAvailableStudents = async () => {
            const params = {
              page: Number(page),
              pageSize: Number(pageSize),
              sort,
              sortDir,
              search,
              courseId,
            };
            try {
              const res = await getStudentList(params);
              console.log(params);
              setStudents(res.data.students);
              setTotal(res.data.total);
            } catch (err) {
              toast.error("Failed to fetch available students");
            }
          };

          const fetchData = async () => {
            try {
              console.log("Fetching data...");
              await Promise.all([
                fetchPickedStudents(),
                fetchAvailableStudents(),
              ]);
              console.log("Data fetched successfully.");
            } catch (err) {
              console.error("Error fetching data:", err);
              toast.error("Lỗi khi tải dữ liệu.");
            }
          };

          const resetState = () => {
            setPage("1");
            setPageSize("6");
            setSort("");
            setSortDir("asc");
            setSearch("");
          };

          useEffect(() => {
            fetchAvailableStudents();
          }, [page, pageSize, sort, sortDir, search]);
          useEffect(() => {
            fetchPickedStudents();
            console.log("Call reset");
          }, [page2, pageSize2, sort, sortDir, search]);
          useEffect(() => {
            fetchPickedStudents();
            console.log("isModalVisible changed:", isModalVisible);
            fetchFullStudentList();
          }, [isModalVisible]);

          const showModal = async () => {
            console.log("Opening modal...");
            setIsModalVisible(true); // Open modal first
            try {
              await fetchData(); // Fetch data after modal opens
              console.log("Data fetched successfully.");
            } catch (err) {
              console.error("Error fetching data:", err);
            }
          };

          const columns: ColumnsType<Student>[] = [
            {
              title: "ID",
              dataIndex: "studentId",
              width: "20%",
            },
            {
              title: "Name",
              dataIndex: "username",
              width: "50%",
            },
            {
              title: "Email",
              dataIndex: "email",
              width: "",
            },
            {
              title: "Action",
              render: (_, record) => {
                const isSelected = fullStudent.some(
                  (student) => student.studentId === record.studentId
                );
                return (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      setFullStudent((prev) => {
                        let newList = fullStudent;
                        if (e.target.checked) {
                          newList = [...prev, record]; // Add student to tempList
                        } else {
                          newList = prev.filter(
                            (student) => student.studentId !== record.studentId
                          ); // Remove student from tempList
                        }
                        console.log("Updated tempList:", newList); // Log tempList each time it changes
                        return newList;
                      });
                    }}
                  />
                );
              },
              width: "50px",
            },
          ];

          return (
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <ComponentContainer
                    justifyContent="left"
                    padding={{ left: "20px", top: "20px" }}
                  >
                    <Label text="Students" fontSize="medium"></Label>
                  </ComponentContainer>
                  <Button
                    // type="button"
                    // style={{
                    //   width: "40px",
                    //   height: "40px",
                    //   marginLeft: "14px",
                    //   padding: "0px",
                    // }}
                    style={{ marginTop: 20, marginLeft: 1000 }}
                    onClick={showModal}
                  >
                    Thêm
                  </Button>
                </div>
              </div>
              <Modal
                style={{ top: 60 }}
                title="Manage Students"
                visible={isModalVisible}
                onOk={async () => {
                  try {
                    const requestBody = {
                      courseId,
                      students: fullStudent.map((student) => student.studentId), // List of studentIds
                    };
                    console.log("Request Body:", requestBody);
                    await updateStudentInCourses(requestBody);
                    toast.success("Cập nhật học sinh vào khóa học thành công!");
                    field.onChange(tempList);
                    setIsModalVisible(false);
                  } catch (err) {
                    console.error("Error updating students:", err);
                    toast.error("Cập nhật học sinh thất bại!");
                  }
                }}
                onCancel={handleCancel}
                width={1000}
              >
                <h4>Picked Students</h4>
                <DataTable<Student>
                  height="180px"
                  dataSource={fullStudent}
                  // paramsState={{
                  //   setPage: setPage2,
                  //   setPageSize: setPageSize2,
                  //   setSort,
                  //   setSortDir,
                  //   setSearch,
                  // }}
                  // page={page2}
                  // pageSize={pageSize2}
                  // total={total2}
                  columns={columns2}
                />
                <h4>Available Students</h4>
                <DataTable<Student>
                  height="200px"
                  dataSource={students}
                  paramsState={{
                    setPage,
                    setPageSize,
                    setSort,
                    setSortDir,
                    setSearch,
                  }}
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  columns={columns}
                />
              </Modal>
            </div>
          );
        }}
      />
    </div>
  );
};

export default ChooseStudentModal;
