import React, { useEffect } from "react";
import { adminNavigation } from "../../../../states/adminNavigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingState } from "../../../../states/loading";
import Input from "../../../../components/Input";
import Form from "../../../../components/Form";
import FormItem from "../../../../components/FormItem";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import MaxWidthContainer from "../../../../components/MaxWidthContainer";
import ComponentContainer from "../../../../components/ComponentContainer";
import { Controller } from "react-hook-form";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import CustomDatePicker from "../../../../components/CustomDatePicker";
import ChooseLecturerModal from "./components/ChooseLecturerModal";
import {
  Lecturer,
  Schedule,
  Student,
  Subject,
} from "../../../../interfaces/Course";
import ChooseSubjectModal from "./components/ChooseSubjectModal";
import ChooseStudentModal from "./components/ChooseStudentModal";
import Label from "../../../../components/Label";
import ScheduleList from "../../../../components/ScheduleList";
import ScheduleSelectComponent from "./components/ScheduleSelectComponent";
import { createCourse } from "../../../../services/CourseService";
import { toast } from "react-toastify";
// import exp from "constants";

// export type Schedule = {
//   date: string;
//   startTime: string;
//   endTime: string;
// };

export type CourseCreateFormData = {
  startDate: string;
  endDate: string;
  lecturers: Lecturer[];
  students: Student[];
  subject: Subject;
  schedules: Schedule[];
};

export type CourseCreateDTO = {
  startDate: string;
  endDate: string;
  subjectId: number;
  lecturerIds: number[];
  // lecturers: Lecturer[];
  // students: Student[];
  // subject: Subject;
  studentIds: number[];
  schedules: Schedule[];
};

const AdminCoursesCreate = () => {
  const [itemId, setAdminNavigation] = useRecoilState(adminNavigation);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CourseCreateFormData>({
    defaultValues: {
      startDate: dayjs().format("DD-MM-YYYY"), // Giá trị mặc định là ngày hiện tại
      lecturers: [],
      students: [],
      schedules: [],
    },
  });
  console.log("Default Values:", control._defaultValues);

  const setIsLoading = useSetRecoilState(loadingState);
  setIsLoading(false);

  useEffect(() => {
    setAdminNavigation(1);
  }, []);

  const onSubmit = async (data: CourseCreateFormData) => {
    setIsLoading(true);
    console.log(data);
    const courseCreateDTO: CourseCreateDTO = {
      startDate: data.startDate,
      endDate: data.endDate,
      subjectId: data.subject.subjectId,
      lecturerIds: data.lecturers.map((lecturer) => lecturer.lecturerId),
      studentIds: data.students.map((student) => student.studentId),
      schedules: data.schedules,
    };

    setIsLoading(true);
    createCourse(courseCreateDTO)
    .then((res) => {
      console.log(res);
      toast.success("Create course successfully");
      setIsLoading(false);
    })
    .catch((e) => {
      console.log(e);
      toast.error("Create course failed");
      setIsLoading(false);
    });

    console.log(courseCreateDTO);

    // setError("");

    // loginByEmail(data)
    //   .then((res) => {
    //     localStorage.setItem("token", res.data.token);

    //     const userData: User = {
    //       userId: res.data.userId,
    //       username: res.data.username,
    //       email: res.data.email,
    //       phone: res.data.phone,
    //       gender: res.data.gender,
    //       dob: res.data.dob,
    //       countryCode: res.data.countryCode,
    //       token: res.data.token,
    //       avatar: "user_avatar"
    //     };
    //     setUserState(userData);
    //     localStorage.setItem(userData.avatar, res.data.avatar);

    //     console.log(userData)

    //     navigate("/courses");
    //   })
    //   .catch((e) => {
    //     setError(e?.message || "Login failed");
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //     if (submitButtonRef.current) {
    //       submitButtonRef.current.blur();
    //     }
    //   });
  };

  return (
    <div>
      <ComponentContainer justifyContent="center" padding={{ bottom: "20px" }}>
        <Label text="New course" fontSize="large" bold />
      </ComponentContainer>
      <MaxWidthContainer align="start" maxWidth="100%">
        <Form onSubmit={handleSubmit(onSubmit)} gap="large">
          <FormItem>
            <ChooseSubjectModal name="subject" control={control} />
          </FormItem>

          <FormItem>
            <ScheduleSelectComponent name="schedules" control={control} />
          </FormItem>

          <FormItem>
            <ChooseLecturerModal name="lecturers" control={control} />
          </FormItem>

          <FormItem>
            <ChooseStudentModal name="students" control={control} />
          </FormItem>

          <FormItem>
            <Label text="Start Date" fontSize="medium" />
            <CustomDatePicker
              name="startDate"
              placeholder="Select Start Date"
              control={control}
            />
          </FormItem>

          <FormItem>
            <Label text="End Date" fontSize="medium" />
            <CustomDatePicker
              name="endDate"
              placeholder="Select End Date"
              control={control}
            />
          </FormItem>

          <FormItem style={{ alignItems: "center" }}>
            <Button
              type="submit"
              onClick={() => console.log(errors)}
              color="secondary"
              maxWidth="300px"
              style={{ marginTop: "12px" }}
            >
              Submit
            </Button>
          </FormItem>
        </Form>
      </MaxWidthContainer>
    </div>
  );
};

export default AdminCoursesCreate;
