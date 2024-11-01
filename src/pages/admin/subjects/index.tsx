import React, { useEffect, useState } from "react";
import { adminNavigation } from "../../../states/adminNavigation";
import { useRecoilState } from "recoil";
import { GetAllSubjects } from "../../../services/SubjectService";
import { Divider, Table } from "antd";
import DataTable from "../courses/components/DataTable";


const queryParams = new URLSearchParams(location.search);
const page = queryParams.get("page") || "1";
const pageSize = queryParams.get("pageSize") || "10";
const sort = queryParams.get("sort") || "subjectId";
const sortDir = queryParams.get("sortDir") || "asc";
const params = {
  page: Number(page),
  pageSize: Number(pageSize),
  sort,
  sortDir,
};
type SubjectTalbe = {
  subjectId: number,
  subjectName: string,
  desctription: string
}

const AdminSubjects = () => {
  // useState
  const [listSubject, setListSubject] = useState<any>()
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);

  useEffect(() => {
    setAdminNavigation(2);
  }, []);

  useEffect(() => {
    GetAllSubjects()
    .then((res) => {
      setListSubject(res.data)
    }).catch((e) => {
    })
  }, []);


  const columns = [
    {
      title: 'ID ',
      dataIndex: 'subjectId',
      key: 'subjectId',
      sorter: true,
      render:( text:any) => <a>{text}</a>
    },
    {
      title: 'Name',
      dataIndex: 'subjectName',
      key: 'subjectName'
    },
    {
      title: 'Desctription',
      dataIndex: 'desctription',
      key: 'desctription'
    },  
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Edit</a>
          <Divider type="vertical" />
          <a>Delete</a>
        </span>
      ),
    },
  ];


const data = (listSubject != null && listSubject.map((item:any) => {
  return {
    key:item.subjectId,
    subjectId: item.subjectId,
    subjectName: item.subjectName,
    desctription: item.description
  }
})) 
console.log(data)

  return (
    <div>
      <h1>Subject</h1>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
export default AdminSubjects;
