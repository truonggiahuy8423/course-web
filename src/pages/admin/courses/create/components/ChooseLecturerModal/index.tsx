import React, { useEffect, useState } from "react";
import { Modal, List } from "antd";
import { useForm, Controller, set } from "react-hook-form";
import Button from "../../../../../../components/Button";
import DataTable, {
  ColumnsType,
} from "../../../../../../components/DataTable2";
import { Lecturer } from "../../../../../../interfaces/Course";
import ListLecturer from "../../../../../../components/ListLecturer";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../../../../../states/loading";
import { getLecturerList } from "../../../../../../services/CourseService";
import { toast } from "react-toastify";

type Props = {
  name: string;
  control: any;
};

export const ChooseLecturerModal = (prop: Props) => {
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
          const [tempList, setTempList] = useState<Lecturer[]>([]);
          const [lecturers, setLecturers] = useState<Lecturer[]>([]);
          const [total, setTotal] = useState(0);
          const [page, setPage] = useState("1");
          const [pageSize, setPageSize] = useState("6");
          const [sort, setSort] = useState("");
          const [sortDir, setSortDir] = useState("asc");
          const [search, setSearch] = useState("");

          const getLecturers = async () => {
            setIsLoading(true);

            // const queryParams = new URLSearchParams(location.search);

            const params = {
              page: Number(page),
              pageSize: Number(pageSize),
              sort,
              sortDir,
              search,
            };

            getLecturerList(params)
              .then(async (res) => {
                setLecturers(res.data.lecturers);
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
            }
          }, [isModalVisible]);
          useEffect(() => {
            getLecturers();
          }, [page, pageSize, sort, sortDir, search]);
          const columns: ColumnsType<Lecturer>[] = [
            {
              title: "ID",
              dataIndex: "lecturerId",
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
                const isSelected = tempList.some((lecturer: Lecturer) => {
                  return lecturer.lecturerId === record.lecturerId;
                });

                console.log("isSelected: ", isSelected);

                return (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Add lecturer to tempList if selected
                        setTempList((prev) => [...prev, record]);
                      } else {
                        // Remove lecturer from tempList if already selected
                        setTempList((prev) =>
                          prev.filter(
                            (lecturer) =>
                              lecturer.lecturerId !== record.lecturerId
                          )
                        );
                      }
                      console.log("Changed: " + tempList.length);
                      console.log("/");
                    }}
                  />
                );
              },
              width: "50px",
            },
          ];

          return (
            <div style={{ width: "100%" }}>
              <ListLecturer lecturers={field.value} />
              <Button
                type="button"
                onClick={() => {
                  showModal();
                  console.log(field.value);
                }}
              >
                Select
              </Button>
              <Modal
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
                Picked lecturers
                <ListLecturer lecturers={tempList} />
                List of lecturers
                <DataTable<Lecturer>
                  dataSource={lecturers}
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

export default ChooseLecturerModal;
