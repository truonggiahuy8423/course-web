import {
    EllipsisOutlined,
    EyeOutlined,
    DeleteOutlined,
  } from "@ant-design/icons";
  import { Button, Dropdown, MenuProps, Modal } from "antd";
  import { useState } from "react";
  import { toast } from "react-toastify";
  import { useRecoilValue, useSetRecoilState } from "recoil";
  import { loadingState } from "../../../../../states/loading";
  import { Lecturer } from "../..";
  import { useNavigate } from "react-router-dom";
  import { deleteLecturers } from "../../../../../services/LecturerService";
  
  type Props = {
    lecturer: Lecturer;
    afterDone: () => void;
  };
  
  
  const RowAction = (props: Props) => {
    const { lecturer, afterDone } = props;
    const setLoading = useSetRecoilState(loadingState);
    const navigate = useNavigate();
  
      
    const deleteLecturer = (lecturerId: number) => {
      setLoading(true);

      confirm("Are you sure you want to delete this lecturer?");
      toast.success("Lecturer deleted successfully");
      afterDone();
    }
  
    const actions: MenuProps["items"] = [
      {
        key: "1",
        label: "View",
        icon: <EyeOutlined />,
        onClick: () => navigate(`/admin/course`),
      },
      {
        key: "2",
        label: "Delete",
        icon: <DeleteOutlined />,
        onClick: () => deleteLecturers(lecturer.lecturerId),
      },
    ];
  
    return (
      <>
        <Dropdown
          trigger={["click"]}
          menu={{
            items: actions,
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      </>
    );
  };
  
  export default RowAction;
  