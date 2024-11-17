import classnames from 'classnames';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './index.module.scss';

type lecturer = {
  lecturerId: number;
  username: string;
  email: string;
  lastAccess: string;
  gender: boolean;
  avatar: string;
};


type Props = {
  data: lecturer[];
};

const DataTable = (props: Props) => {
  const { data } = props;

  return (
    <div className={styles["wrap-table100"]}>
      <div className={styles["table100"]}>
        <table>
          <thead>
            <tr className={styles["table100-head"]}>
              <th className={styles["column1"]}>Lecturer ID</th>
              <th className={styles["column2"]}>User Name</th>
              <th className={styles["column3"]}>Email</th>
              <th className={styles["column4"]}>gender</th>
              <th className={styles["column5"]}></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map(lecturer => (
                <tr key={lecturer.lecturerId}>
                  <td className={styles["column1"]}>{lecturer.lecturerId}</td>
                  <td className={styles["column2"]}>{lecturer.username}</td>
                  <td className={styles["column3"]}>{lecturer.email}</td>
                  <td className={styles["column4"]}>{lecturer.gender}</td>
                  <td className={styles["column5"]}>
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
