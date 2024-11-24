import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import Button from "../../../../../../components/Button";
import { EditOutlined } from "@ant-design/icons";
import DataTable, { ColumnsType } from "../../../../../../components/DataTable2";
import ComponentContainer from "../../../../../../components/ComponentContainer";
import Label from "../../../../../../components/Label";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../../../../../states/loading";
import { getStudentsByCourseId, getStudentsNotInCourse } from "../../../../../../services/CourseService";
import { toast } from "react-toastify";
import { Student } from "../../../../../../interfaces/Course";

type Props = {
  name: string;
  control: any;
  courseId: string;
};

export const ChooseStudentModal = (prop: Props) => {
  const { name, control, courseId } = prop;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setIsLoading = useSetRecoilState(loadingState);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
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
            setIsLoading(true);
  
              const params = {
                page: Number(page2),
                pageSize: Number(pageSize2),
                sort,
                sortDir,
                search,
                courseId,
              };
              getStudentsByCourseId(params)
                .then(async (res) => {
                  setTempList(res.data.students );
                  console.log("TempList from API:", res.data.students);
                  setTotal2(res.data.total);
                  setIsLoading(false);
                }).catch((err) => {
                  toast.error(err);
                  setIsLoading(false);
                });
          };
          // useEffect(() => {
          //   const startIndex = (Number(page2) - 1) * Number(pageSize2);
          //   const endIndex = startIndex + Number(pageSize2);
          //   setStudents2(tempList.slice(startIndex, endIndex));
          //   setTotal2(tempList.length);
          //   console.log("TempList state updated:", tempList);


          // }, [tempList, page2, pageSize2]);

          


          const fetchAvailableStudents = async () => {
            setIsLoading(true);
            try {
              const params = {
                page: Number(page),
                pageSize: Number(pageSize),
                sort,
                sortDir,
                search,
                courseId,
              };
              const res = await getStudentsNotInCourse(params);
              setStudents(res.data.students);
              setTotal(res.data.total);
            } catch (err) {
              toast.error("Failed to fetch available students.");
            } finally {
              setIsLoading(false);
            }
          };

          const fetchData = async () => {
            try {
              // In ra trạng thái của isModalVisible trước khi gọi API
              console.log("isModalVisible before API call:", isModalVisible);
              
              setIsLoading(true);

              await Promise.all([fetchPickedStudents(), fetchAvailableStudents()]);
              console.log("isModalVisible after API call:", isModalVisible);
            } catch (err) {
              console.log("Error:", err);  // Log lỗi nếu có
              toast.error("Lỗi khi tải dữ liệu");
              setIsLoading(false); // Đảm bảo setIsLoading(false) được gọi nếu có lỗi
            }
          };
          
          
          useEffect(() => {
            if (isModalVisible) {
              fetchData();
              setPage("1");
              setPageSize("6");
              setSort("");
              setSortDir("asc");
              setSearch("");
              
            }
       
          }, [isModalVisible]);

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
                const isSelected = tempList.some((student) => student.studentId === record.studentId);
                return (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTempList((prev) => [...prev, record]);
                      } else {
                        setTempList((prev) => prev.filter((student) => student.studentId !== record.studentId));
                      }
                    }}
                  />
                );
              },
              width: "50px",
            },
          ];

          return (
            <div style={{ width: "100%" }}>
              <ComponentContainer justifyContent="left" padding={{ bottom: "10px" }}>
                <Label text="Students" fontSize="medium" />
                <Button
                  type="button"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginLeft: "14px",
                    padding: "0px",
                  }}
                  onClick={showModal}
                >
                  <EditOutlined />
                </Button>
              </ComponentContainer>
              <Modal
                style={{ top: 60 }}
                title="Manage Students"
                visible={isModalVisible}
                onOk={() => {
                  field.onChange(tempList);
                  setIsModalVisible(false);
                }}
                onCancel={handleCancel}
                width={1000}
              >
                <h4>Picked Students</h4>
                <DataTable<Student>
                  height="180px"
                  dataSource={students2}
                  paramsState={{
                    setPage: setPage2,
                    setPageSize: setPageSize2,
                    setSort,
                    setSortDir,
                    setSearch,
                  }}
                  page={page2}
                  pageSize={pageSize2}
                  total={total2}
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
