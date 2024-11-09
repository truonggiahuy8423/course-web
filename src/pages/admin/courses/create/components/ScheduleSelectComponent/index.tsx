import React, { useEffect, useState } from "react";
import { Modal, List } from "antd";
import { useForm, Controller, set } from "react-hook-form";
import Button from "../../../../../../components/Button";
import DataTable, {
  ColumnsType,
} from "../../../../../../components/DataTable2";
import { Lecturer, Schedule } from "../../../../../../interfaces/Course";
import ListLecturer from "../../../../../../components/ListLecturer";
import { useSetRecoilState } from "recoil";
import { EditOutlined } from "@ant-design/icons";
import { loadingState } from "../../../../../../states/loading";
import { getLecturerList } from "../../../../../../services/CourseService";
import { toast } from "react-toastify";
import ComponentContainer from "../../../../../../components/ComponentContainer";
import Label from "../../../../../../components/Label";
import ScheduleList from "../../../../../../components/ScheduleList";
import ScheduleModal from "../ScheduleModal";

type Props = {
  name: string;
  control: any;
};

export const ScheduleSelectComponent = (prop: Props) => {
  const { name, control } = prop;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [schedule, setSchedule] = useState<Schedule | undefined>(undefined);
  const [modalActions, setModalActions] = useState<any>(null);

  const setIsLoading = useSetRecoilState(loadingState);

  const getSchedule = (data?: Schedule) => {
    // setIsModalVisible(true);
    console.log("Clicked");

    return new Promise((resolve) => {
      setIsModalVisible(true);
      setSchedule(data);
      console.log("data");
      console.log(data);

      // Hàm xử lý khi người dùng xác nhận
      const handleConfirm = (schedule: Schedule) => {
        setIsModalVisible(false);
        resolve(schedule); // Trả về kết quả là "Đồng ý"
      };

      // Hàm xử lý khi người dùng hủy
      const handleCancel = () => {
        setIsModalVisible(false);
        resolve(undefined); // Trả về kết quả là "Hủy"
      };

      // Gán hàm xử lý này vào state để truyền vào modal
      setModalActions({ handleConfirm, handleCancel });
    });
  };

  return (
    <div>
      <Label text="Schedule" fontSize="medium" />
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <ScheduleModal
                visible={isModalVisible}
                data={schedule}
                onOk={modalActions?.handleConfirm}
                onCancel={modalActions?.handleCancel}
              />
              <ScheduleList
                schedules={field.value}
                editable
                onItemAdd={async () => {
                  console.log("Add");
                  let newSchedule = await getSchedule();
                  if (newSchedule) {
                    field.onChange([...field.value, newSchedule]);
                  }
                }}
                onItemClick={(schedule: Schedule) => {}}
                onItemEdit={async (schedule: Schedule, index: number) => {
                  let newSchedule = await getSchedule(schedule);
                  if (newSchedule) {
                    let newSchedules = field.value.map(
                      (item: Schedule, i: number) => {
                        return i === index ? newSchedule : item;
                      }
                    );
                    field.onChange(newSchedules);
                  }
                }}
                onItemDelete={(deleted: Schedule, index: number) => {
                  let newSchedules = field.value.filter(
                    (item: Schedule, i: number) => i !== index
                  );
                  field.onChange(newSchedules);
                }}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default ScheduleSelectComponent;
