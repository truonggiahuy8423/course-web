import React, { useEffect, useState } from "react";
import { Modal, List } from "antd";
import { useForm, Controller, set } from "react-hook-form";
import Button from "../../../../../../components/Button";
import { EditOutlined } from "@ant-design/icons";
import DataTable, {
  ColumnsType,
} from "../../../../../../components/DataTable2";
import { Lecturer, Student } from "../../../../../../interfaces/Course";
import ListLecturer from "../../../../../../components/ListLecturer";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../../../../../states/loading";
import {
  getLecturerList,
  getStudentList,
} from "../../../../../../services/CourseService";
import { toast } from "react-toastify";
import ComponentContainer from "../../../../../../components/ComponentContainer";
import Label from "../../../../../../components/Label";

type Props = {
  name: string;
  control: any;
};

export const ChooseStudentModal = (prop: Props) => {
  const { name, control } = prop;
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
          const [tempList, setTempList] = useState<Student[]>([]);

          const [students, setStudents] = useState<Student[]>([]);
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
          useEffect(() => {
            const startIndex = (Number(page2) - 1) * Number(pageSize2);
            const endIndex = startIndex + Number(pageSize2);
            const paginatedList = tempList.slice(startIndex, endIndex);
            setStudents2(paginatedList);
            setTotal2(tempList.length);
            // setStudents2(students);
          }, [tempList, page2, pageSize2]);

          const [students3, setStudents3] = useState<Student[]>([]);
          const [total3, setTotal3] = useState(0);
          const [page3, setPage3] = useState("1");
          const [pageSize3, setPageSize3] = useState("6");
          const columns3: ColumnsType<Student>[] = [
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
          useEffect(() => {
            const startIndex = (Number(page3) - 1) * Number(pageSize3);
            const endIndex = startIndex + Number(pageSize3);
            const paginatedList = field.value.slice(startIndex, endIndex);
            setStudents3(paginatedList);
            setTotal3(field.value.length);
            // setStudents2(students);
          }, [field.value, page3, pageSize3]);

          const getStudents = async () => {
            setIsLoading(true);

            // const queryParams = new URLSearchParams(location.search);

            const params = {
              page: Number(page),
              pageSize: Number(pageSize),
              sort,
              sortDir,
              search,
            };

            getStudentList(params)
              .then(async (res) => {
                setStudents(res.data.students);
                setTotal(res.data.total);
                setIsLoading(false);
              })
              .catch((err) => {
                toast.error(err);
                setIsLoading(false);
              });
          };

          useEffect(() => {
            if (isModalVisible) {
              setTempList(field.value);
              setPage("1");
              setPageSize("6");
              setSort("");
              setSortDir("asc");
              setSearch("");

              setPage2("1");
              setPageSize2("6");
              setPage3("1");
              setPageSize3("6");
            }
          }, [isModalVisible]);
          useEffect(() => {
            getStudents();
          }, [page, pageSize, sort, sortDir, search]);
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
              title: "",
              render: (_, record) => {
                console.log(tempList);
                const isSelected = tempList.some((student: Student) => {
                  return student.studentId === record.studentId;
                });

                console.log("isSelected: ", isSelected);

                return (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Add lecturer to tempList if selected

                        setTempList((prev) => [record, ...prev]);
                      } else {
                        // Remove lecturer from tempList if already selected
                        setTempList((prev) =>
                          prev.filter(
                            (student) => student.studentId !== record.studentId
                          )
                        );
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
              {/* <ListLecturer lecturers={field.value} /> */}
              <ComponentContainer
                justifyContent="left"
                padding={{ bottom: "10px" }}
              >
                <Label text="Students" fontSize="medium" />
                <Button
                  type="button"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginLeft: "14px",
                    padding: "0px",
                  }}
                  onClick={() => {
                    showModal();
                    console.log(field.value);
                  }}
                >
                  <EditOutlined style={{}} />
                </Button>
              </ComponentContainer>
              <DataTable<Student>
                dataSource={students3}
                paramsState={{
                  setPage: setPage3,
                  setPageSize: setPageSize3,
                  setSort,
                  setSortDir,
                  setSearch,
                }}
                page={page3}
                pageSize={pageSize3}
                total={total3}
                columns={columns3}
              />
              <Modal
                style={{
                  top: 60
                }}
                title=""
                visible={isModalVisible}
                onOk={() => {
                  // Update the field's value with the selected lecturers
                  field.onChange(tempList);
                  setIsModalVisible(false);
                }}
                onCancel={handleCancel}
                width={1000}
              >
                Picked students
                {/* <ListLecturer lecturers={tempList} /> */}
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
                List of students
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
