import React, { useEffect, useState } from "react";
import { Modal, List } from "antd";
import { useForm, Controller, set } from "react-hook-form";
import Button from "../../../../../../components/Button";
import DataTable, {
  ColumnsType,
} from "../../../../../../components/DataTable2";
import { Lecturer, Subject } from "../../../../../../interfaces/Course";
import ListLecturer from "../../../../../../components/ListLecturer";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../../../../../states/loading";
import {
  getLecturerList,
  getSubjectList,
} from "../../../../../../services/CourseService";
import { toast } from "react-toastify";
import SubjectDescription from "../../../../../../components/SubjectDescription";

type Props = {
  name: string;
  control: any;
};

export const ChooseSubjectModal = (prop: Props) => {
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
          const [tempSubject, setTempSubject] = useState<Subject>();
          const [subjects, setSubjects] = useState<Subject[]>([]);
          const [total, setTotal] = useState(0);
          const [page, setPage] = useState("1");
          const [pageSize, setPageSize] = useState("6");
          const [sort, setSort] = useState("");
          const [sortDir, setSortDir] = useState("asc");
          const [search, setSearch] = useState("");

          const getSubjects = async () => {
            setIsLoading(true);

            // const queryParams = new URLSearchParams(location.search);

            const params = {
              page: Number(page),
              pageSize: Number(pageSize),
              sort,
              sortDir,
              search,
            };

            getSubjectList(params)
              .then(async (res) => {
                setSubjects(res.data.subjects);
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
              setTempSubject(field.value);
              setPage("1");
              setPageSize("6");
              setSort("");
              setSortDir("asc");
              setSearch("");
            }
          }, [isModalVisible]);
          useEffect(() => {
            getSubjects();
          }, [page, pageSize, sort, sortDir, search]);
          const columns: ColumnsType<Subject>[] = [
            {
              title: "ID",
              dataIndex: "subjectId",
              width: "20%",
            },
            {
              title: "Name",
              dataIndex: "subjectName",
              width: "50%",
            },
            {
              title: "Description",
              dataIndex: "description",
              width: "",
            },
            {
              title: "",
              render: (_, record) => {
                const isSelected = tempSubject?.subjectId === record.subjectId;

                return (
                  <input
                    type="radio"
                    name="subject"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTempSubject(record);
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
              <SubjectDescription subject={field.value} />
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
                  field.onChange(tempSubject);
                  setIsModalVisible(false);
                }}
                onCancel={handleCancel}
                width={1000}
              >
                Picked subject:
                <SubjectDescription subject={tempSubject} />
                List of subjects:
                <DataTable<Subject>
                  dataSource={subjects}
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

export default ChooseSubjectModal;
