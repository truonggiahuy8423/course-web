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
import moment from "moment";
import { Dayjs } from "dayjs";
import CustomDatePicker from "../../../../components/CustomDatePicker";
import ChooseLecturerModal from "./components/ChooseLecturerModal";
import { Lecturer, Subject } from "../../../../interfaces/Course";
import ChooseSubjectModal from "./components/ChooseSubjectModal";
// import exp from "constants";

export type Schedule = {
  date: string;
  startTime: string;
  endTime: string;
};

export type CourseCreateFormData = {
  startDate: string;
  endDate: string;
  // subjectId: number;
  // lecturerIds: number[];
  lecturers: Lecturer[];
  subject: Subject;
  studentIds: number[];
  schedule: Schedule[];
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
      // lecturers: Lecturer[],
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
        <h3>New course</h3>
      </ComponentContainer>
      <MaxWidthContainer align="start" maxWidth="100%">
        <Form onSubmit={handleSubmit(onSubmit)} gap="medium">
          <FormItem>
            Start Date:
            <CustomDatePicker 
              name="startDate" 
              placeholder="Select Start Date"
              control={control}
              />
          </FormItem>

          <FormItem>
            End Date:
            <CustomDatePicker 
              name="endDate" 
              placeholder="Select End Date"
              control={control}
              />
          </FormItem>
          <FormItem>
            Lecturers:
            <ChooseLecturerModal 
            name="lecturers" 
            control={control}
            />
          </FormItem>
          <FormItem>
            Subject:
            <ChooseSubjectModal 
            name="subject" 
            control={control}
            />
          </FormItem>
          {/* <FormItem>
            Start Date:
            <Input
              id="email"
              type="text"
              placeholder="Username(email)"
              autoComplete="true"
              // disabled={isLoading}
              // Sử dụng nhiều quy tắc với trường rules
              register={register("", {
                required: "Email is required", // Quy tắc bắt buộc
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for email
                  message: "Invalid email address", // Thông báo khi vi phạm pattern
                },
              })}
              // errorMessage={errors.email?.message}
            />
          </FormItem>

          <FormItem>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="true"
              // disabled={isLoading}
              // Sử dụng nhiều quy tắc với trường rules
              register={register("endDate", {
                required: "Password is required", // Quy tắc bắt buộc
                minLength: {
                  value: 6, // Độ dài tối thiểu
                  message: "Password must be at least 6 characters", // Thông báo lỗi
                },
                maxLength: {
                  value: 12, // Độ dài tối đa
                  message: "Password must not exceed 12 characters",
                },
              })}
              // errorMessage={errors.password?.message}
              // errorMessage={JSON.stringify(errors)}
            />
          </FormItem> */}
          <FormItem>
            {/* <button>Ok</button> */}
            <Button
              type="submit"
              onClick={() => console.log(errors)}
              // ref={submitButtonRef}
              // className={styles.button}
              color="secondary"
              maxWidth="fit-content"
              style={{ marginTop: "12px" }}
              // disabled={
              //   Object.keys(errors).length !== 0 || isLoading ? true : false
              // }
              // loading={isLoading}
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
