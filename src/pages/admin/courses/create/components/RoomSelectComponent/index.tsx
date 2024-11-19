import React, { useEffect, useState } from "react";
import { Modal, List } from "antd";
import { useForm, Controller, set } from "react-hook-form";
import Button from "../../../../../../components/Button";
import DataTable, {
  ColumnsType,
} from "../../../../../../components/DataTable2";
import { EditOutlined } from "@ant-design/icons";
import { Lecturer, Room, Subject } from "../../../../../../interfaces/Course";
import ListLecturer from "../../../../../../components/ListLecturer";
import { useSetRecoilState } from "recoil";
import { loadingState } from "../../../../../../states/loading";
import {
  getLecturerList,
  getRoomList,
  getSubjectList,
} from "../../../../../../services/CourseService";
import { toast } from "react-toastify";
import SubjectDescription from "../../../../../../components/SubjectDescription";
import ComponentContainer from "../../../../../../components/ComponentContainer";
import Label from "../../../../../../components/Label";

type Props = {
  name: string;
  control: any;
};

export const RoomSelectComponent = (prop: Props) => {
  const { name, control } = prop;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setIsLoading = useSetRecoilState(loadingState);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          //   const [tempSubject, setTempSubject] = useState<Room>();
          const [rooms, setRooms] = useState<Room[]>([]);
          const [total, setTotal] = useState(0);
          const [page, setPage] = useState("1");
          const [pageSize, setPageSize] = useState("5");
          const [sort, setSort] = useState("");
          const [sortDir, setSortDir] = useState("asc");
          const [search, setSearch] = useState("");

          const getRooms = async () => {
            setIsLoading(true);

            // const queryParams = new URLSearchParams(location.search);

            const params = {
              page: Number(page),
              pageSize: Number(pageSize),
              sort,
              sortDir,
              search,
            };

            getRoomList(params)
              .then(async (res) => {
                setRooms(res.data.rooms);
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
              //   set(field.value);
              setPage("1");
              setPageSize("5");
              setSort("");
              setSortDir("asc");
              setSearch("");
            }
          }, [isModalVisible]);
          useEffect(() => {
            getRooms();
          }, [page, pageSize, sort, sortDir, search]);
          const columns: ColumnsType<Room>[] = [
            {
              title: "ID",
              dataIndex: "roomId",
              width: "20%",
            },
            {
              title: "Name",
              dataIndex: "roomName",
              width: "30%",
            },
            {
              title: "Created At",
              dataIndex: "createdDate",
              width: "20%",
            },
            {
              title: "Updated At",
              dataIndex: "updatedDate",
              width: "20%",
            },
            {
              title: "",
              render: (_, record) => {
                const isSelected = (field.value) ? field.value.roomId === record.roomId : false;

                return (
                  <input
                    type="radio"
                    name="room"
                    checked={isSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        field.onChange(record);
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
              {/* <ComponentContainer
                justifyContent="left"
                padding={{ bottom: "10px" }}
              > */}
                {field.value ? `ID: ${field.value.roomId}-Name: ${field.value.roomName}` : <p style={{color: '#c2c2c2', fontSize: '13px'}}>No room selected</p>}
                {/* <SubjectDescription subject={field.value} /> */}
                <br/>
                <DataTable<Room>
                    // height="400px"
                  dataSource={rooms}
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
              {/* </ComponentContainer> */}
            </div>
          );
        }}
      />
    </div>
  );
};

export default RoomSelectComponent;
