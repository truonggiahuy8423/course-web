import React from "react";
import { Lecturer } from "../../interfaces/Course";
import styles from "./index.module.scss";
import Image from "../Image";
import { Link } from "react-router-dom";

type ListLecturerProps = {
  lecturers: Lecturer[];
};

const ListLecturer: React.FC<ListLecturerProps> = ({ lecturers }) => {
  console.log(lecturers);
  return (
    <div className={styles.list}>
      {lecturers?.length === 0 && <p style={{color: '#c2c2c2', fontSize: '13px'}}>No lecturer selected</p>}
      {lecturers?.map((lecturer) => (
        <Link
          className={styles.listItem}
          key={lecturer.lecturerId}
          to={"/user/" + lecturer.lecturerId}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image srcImg={lecturer.avatar} width="16px" height="16px" rounded altImg="/img/avatar_blank.jpg" />
          {lecturer.username}
        </Link>
      ))}
    </div>
  );
};

export default ListLecturer;
