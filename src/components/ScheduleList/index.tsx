import React from "react";
import styles from "./index.module.scss";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Schedule } from "../../interfaces/Course";
import classNames from "classnames";

interface Props {
  schedules?: Schedule[]; // Schedule sẽ là mảng và có thể để trống (optional)
  editable?: boolean;
  onItemClick?: (schedule: Schedule) => void;
  onItemDelete?: (schedule: Schedule, index: number) => void;
  onItemEdit?: (schedule: Schedule, index: number) => void;
  onItemAdd?: () => void;
}

export const ScheduleList: React.FC<Props> = ({
  schedules = [] as Schedule[],
  editable = false,
  onItemClick,
  onItemDelete,
  onItemEdit,
  onItemAdd,
}) => {
  return (
    <div className={styles.container}>
      {schedules?.length === 0 && (
        <p style={{ color: "#c2c2c2", fontSize: "13px" }}>Empty</p>
      )}
      {schedules?.map((schedule, index) => (
        <div
          key={index}
          className={styles.schedule}
          onClick={() => onItemClick && onItemClick(schedule)}
        >
          <span className={styles.room}>Room:{schedule.room.roomName}</span>
          <div className={styles.timeContainer}>
            <p className={styles.time}>Start:{schedule.startTime}</p>
            <p className={styles.time}>End:{schedule.endTime}</p>
          </div>
          {editable && (
            <div className={styles.btnContainer}>
              <button
                className={styles.btn}
                onClick={() => onItemEdit && onItemEdit(schedule, index)}
              >
                <EditOutlined />
              </button>
              <button
                className={styles.btn}
                onClick={() => onItemDelete && onItemDelete(schedule, index)}
              >
                <DeleteOutlined />
              </button>
            </div>
          )}
        </div>
      ))}
      {editable && (
        <span
          className={classNames(styles.schedule, styles.add)}
          onClick={() => {
            onItemAdd && onItemAdd();
          }}
        >
          <PlusOutlined />
        </span>
      )}
    </div>
  );
};

export default ScheduleList;
