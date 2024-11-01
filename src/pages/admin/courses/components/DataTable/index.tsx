import classnames from 'classnames';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './index.module.scss';

type Lecturer = {
  lecturerId: number;
  username: string;
  email: string;
  lastAccess: string;
  gender: boolean;
  avatar: string;
};

type Subject = {
  subjectId: number;
  subjectName: string;
  description: string;
  createdDate: string;
  updatedDate: string;
}

type Course = {
  courseId: number;
  createdDate: string;
  updatedDate: string;
  startDate: string;
  endDate: string;
  lecturers: Lecturer[];
  numberOfStudents: number;
  subject: Subject;
};

type Props = {
  data: Course[];
};

const DataTable = (props: Props) => {
  const { data } = props;

  return (
    <div className={styles["wrap-table100"]}>
      <div className={styles["table100"]}>
        <table>
          <thead>
            <tr className={styles["table100-head"]}>
              <th className={styles["column1"]}>Course ID</th>
              <th className={styles["column2"]}>Subject</th>
              <th className={styles["column3"]}>Lecturers</th>
              <th className={styles["column4"]}>Start Date</th>
              <th className={styles["column5"]}>End Date</th>
              <th className={styles["column6"]}>Enrollment</th>
              <th className={styles["column7"]}></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(course => (
                <tr key={course.courseId}>
                  <td className={styles["column1"]}>{course.courseId}</td>
                  <td className={styles["column2"]}>{course.subject.subjectId + "-" + course.subject.subjectName}</td>
                  <td className={styles["column3"]}>
                    {course.lecturers.map(lecturer => (
                      <div key={lecturer.lecturerId}>{lecturer.username}</div>
                    ))}
                  </td>
                  <td className={styles["column4"]}>{course.startDate}</td>
                  <td className={styles["column5"]}>{course.endDate}</td>
                  <td className={styles["column6"]}>{course.numberOfStudents}</td>
                  <td className={styles["column7"]}>
                    {/* Có thể thêm các hành động như edit, delete ở đây */}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
