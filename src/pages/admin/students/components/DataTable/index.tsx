// import classnames from 'classnames';
// import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import styles from './index.module.scss';
// import axios from 'axios';
// import { getAllStudents } from '../../../../../services/StudentService';
// import { Student } from '../../../../../states/student';

// type Props = {
// };

// const DataTable = (props: Props) => {
//   const [studentList, setStudentList] = useState(null);
//   const fetchStudentList = () => {
//     getAllStudents()
//       .then((res) => {
//         //localStorage.setItem("token", res.data.token);

//         const studentData: Student = {
//           studentId: res.data.studentId,
//           name: res.data.name,
//           email: res.data.email,
//           gender: res.data.gender,
//           dob: res.data.dob,
//         };
//         //setStudentList(studentData);

//         console.log(res);

//       })
//   //     .catch((e) => {
//   //       setError(e?.message || "Login failed");
//   //     })
//   //     .finally(() => {
//   //       setIsLoading(false);
//   //       if (submitButtonRef.current) {
//   //         submitButtonRef.current.blur();
//   //       }
//   //     });
//   }
//   useEffect(() => {
//     fetchStudentList();
//   }) 
//   return (
//     <div className={styles["wrap-table100"]}>
//       <div className={styles["table100"]}>
//         <table>
//           <thead>
//             <tr className={styles["table100-head"]}>
//               <th className={styles["column1"]}>Student ID</th>
//               <th className={styles["column2"]}>Name</th>
//               <th className={styles["column3"]}>Gender</th>
//               <th className={styles["column4"]}>Date of Birth</th>
//               <th className={styles["column5"]}>Email</th>
//               <th className={styles["column6"]}></th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className={styles["column1"]}>2017-09-29 01:22</td>
//               <td className={styles["column2"]}>200398</td>
//               <td className={styles["column3"]}>iPhone X 64Gb Grey</td>
//               <td className={styles["column4"]}>$999.00</td>
//               <td className={styles["column5"]}>1</td>
//               <td className={styles["column6"]}>$999.00</td>
//             </tr>
//             <tr>
//               <td className={styles["column1"]}>2017-09-28 05:57</td>
//               <td className={styles["column2"]}>200397</td>
//               <td className={styles["column3"]}>Samsung S8 Black</td>
//               <td className={styles["column4"]}>$756.00</td>
//               <td className={styles["column5"]}>1</td>
//               <td className={styles["column6"]}>$756.00</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DataTable;


import React, { useEffect, useState } from 'react';
import { Button, Table, Space, message } from 'antd';
import { getAllStudents } from '../../../../../services/StudentService';
import { Student } from '../../../../../states/student';
import styles from './index.module.scss';
import RowAction from '../RowAction';
import { StudentResponse } from '../../../../../interfaces/Student';

const DataTable = () => {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentList = async () => {
    try {
      const res = await getAllStudents({ page: 1, pageSize: 999999 });
      console.log(res);
  
      if (Array.isArray(res.data)) {
        const formattedStudents = res.data.map((student) => ({
          ...student,
          //dob: formatDateString(student.dob),
        }));
        setStudentList(formattedStudents);
      } else {
        console.error("Unexpected data format from getAllStudents()");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (studentId: number) => {
  //   try {
  //     await deleteAStudent(studentId); // Call the delete service
  //     setStudentList((prevList) => prevList.filter((student) => student.studentId !== studentId));
  //     message.success("Student deleted successfully.");
  //   } catch (error) {
  //     console.error("Error deleting student:", error);
  //     message.error("Failed to delete student.");
  //   }
  // };
  
  const formatDateString = (dateArr: [number, number, number]): string => {
    const [year, month, day] = dateArr;
  
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  const columns = [
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Name', dataIndex: 'username', key: 'name' },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: StudentResponse) => {
        return (
          <RowAction
            student={record}
            afterDone={() => getAllStudents({ page: 1, pageSize: 999999 })}
          ></RowAction>
        );
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Table
        columns={columns}
        dataSource={studentList}
        rowKey="studentId"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className={styles.customTableHeader}
      />
    </div>
  );
};

export default DataTable;



