import React, { useEffect, useState } from "react";
import { Modal, Input, DatePicker } from "antd";
import { useForm } from "react-hook-form";
import { Room, Schedule } from "../../../../../../interfaces/Course";
import FormItem from "../../../../../../components/FormItem";
import Form from "../../../../../../components/Form";
import CustomDatePicker from "../../../../../../components/CustomDatePicker";
import { ColumnsType } from "../../../../../../components/DataTable";
import RoomSelectComponent from "../RoomSelectComponent";

interface ScheduleModalProps {
  visible: boolean;
  data?: Schedule;
  onOk?: (data: Schedule) => void;
  onCancel?: () => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({
  visible,
  data,
  onOk,
  onCancel,
}) => {
  const { handleSubmit, reset, control } = useForm<Schedule>();
  console.log("visible", data);
  useEffect(() => {
    reset({});
    if (visible) {
      if (data) {
        reset(data);
      }
    }
  }, [visible, data]);

  const handleOk = (formData: Schedule) => {
    onOk && onOk(formData);
  };

  return (
    <Modal
      title="Schedule"
      width="70%"
      open={visible}
      onOk={handleSubmit(handleOk)}
      onCancel={onCancel}
    >
      <Form gap="medium">
        <FormItem>
          <CustomDatePicker
            mode="datetime"
            placeholder="Start Time"
            control={control}
            name="startTime"
          />
        </FormItem>
        <FormItem>
          <CustomDatePicker
            mode="datetime"
            placeholder="End Time"
            control={control}
            name="endTime"
          />
        </FormItem>
        <FormItem>
          <RoomSelectComponent name="room" control={control} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ScheduleModal;
