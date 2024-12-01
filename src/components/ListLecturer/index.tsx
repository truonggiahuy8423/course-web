import React from "react";
import { Lecturer } from "../../interfaces/Course";
import styles from "./index.module.scss";
import Image from "../Image";
import { Link } from "react-router-dom";
import { CloseButton } from "react-bootstrap";
import { deleteLecturers } from "../../services/LecturerService";

type ListLecturerProps = {
  lecturers: Lecturer[];
};

const ListLecturer: React.FC<ListLecturerProps> = ({ lecturers }) => {
  console.log(lecturers);
  return (
    <div className={styles.list}>
      {lecturers?.length === 0 && (
        <p style={{ color: "#c2c2c2", fontSize: "13px" }}>
          No lecturer selected
        </p>
      )}
      {lecturers?.map((lecturer) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Link
            // className={styles.listItem}
            key={lecturer.lecturerId}
            to={"/user/" + lecturer.lecturerId}
            target="_blank"
            rel="noopener noreferrer"
          >
            {lecturer.username} - {lecturer.email}
          </Link>
          <CloseButton
            onClick={async () => {
              const ok = confirm(
                `Xoá giảng viên ${lecturer.username} ra khỏi lớp?`
              );
              if (ok) {
                await deleteLecturers(lecturer.lecturerId);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ListLecturer;
