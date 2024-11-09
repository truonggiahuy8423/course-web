import React from "react";
import { Subject } from "../../interfaces/Course";
import Image from "../Image";
import styles from "./index.module.scss";

interface SubjectDescriptionProps {
  subject: Subject | undefined;
}

const SubjectDescription: React.FC<SubjectDescriptionProps> = ({ subject }) => {
  if (!subject) {
    return (
      <p style={{ color: "#c2c2c2", fontSize: "13px", paddingBottom: "8px" }}>
        No subject selected
      </p>
    );
  }
  return (
    <div className={styles.container}>
      <Image srcImg={subject?.image} rounded width="100px" height="100px" />
      <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <h2 className={styles.title}>{subject?.subjectName}</h2>
        <p className={styles.description}>{subject?.description}</p>
      </div>
    </div>
  );
};

export default SubjectDescription;
