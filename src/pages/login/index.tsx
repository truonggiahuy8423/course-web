import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import classNames from "classnames";
import { Button, Color } from "../../components/Button";
import FormItem from "../../components/FormItem";
import Form from "../../components/Form";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import { on } from "events";
import { loginByEmail } from "../../services/SecurityService";
import { useRecoilState, useSetRecoilState } from "recoil";
import { User, userState } from "../../states/auth";
// import { useLocation } from "react-router-dom";

// import './LoginPage.css'; // Giả sử bạn có file CSS riêng
export type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null); // Tham chiếu cho nút submit
  const navigate = useNavigate();
  const [user, setUserState] = useRecoilState<User | null>(userState);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    loginByEmail(data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);

        const userData: User = {
          userId: res.data.userId,
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone,
          gender: res.data.gender,
          dob: res.data.dob,
          countryCode: res.data.countryCode,
          token: res.data.token,
          avatar: "user_avatar"
        };
        setUserState(userData);
        localStorage.setItem(userData.avatar, res.data.avatar);

        console.log(userData)

        navigate("/courses");
      })
      .catch((e) => {
        setError(e?.message || "Login failed");
      })
      .finally(() => {
        setIsLoading(false);
        if (submitButtonRef.current) {
          submitButtonRef.current.blur();
        }
      });
  };

  return (
    <div className={styles.login_container}>
      <div className="col-md-6" style={{ width: "500px" }}>
        <div className="card" style={{ padding: "10px 10px" }}>
          <div style={{ borderBottom: "none" }}>
            <div
              style={{
                display: "flex",  
                paddingTop: "20px",
                justifyContent: "center",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <img
                className="login-form__logo"
                src="/img/logo_course.png"
                alt="Logo"
                style={{ width: "300px" }}
              />
            </div>
          </div>
          <div className="card-body">
            <h4 className="card-title mb-3" style={{ textAlign: "center" }}>
              Đăng nhập
            </h4>
            {error && (
              <small className="mt-2 mb-2 text-danger">{error + "."}</small>
            )}
            <Form onSubmit={handleSubmit(onSubmit)} gap="medium">
              <FormItem>
                <Input
                  id="email"
                  type="text"
                  placeholder="Username(email)"
                  autoComplete="false"
                  disabled={isLoading}
                  // Sử dụng nhiều quy tắc với trường rules
                  register={register("email", {
                    required: "Email is required", // Quy tắc bắt buộc
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for email
                      message: "Invalid email address", // Thông báo khi vi phạm pattern
                    },
                  })}
                  errorMessage={errors.email?.message}
                />
              </FormItem>

              <FormItem>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="true"
                  disabled={isLoading}
                  // Sử dụng nhiều quy tắc với trường rules
                  register={register("password", {
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
                  errorMessage={errors.password?.message}
                  // errorMessage={JSON.stringify(errors)}
                />
              </FormItem>
              <FormItem>
                {/* <button>Ok</button> */}
                <Button
                  type="submit"
                  onClick={() => console.log(errors)}
                  ref={submitButtonRef}
                  className={styles.button}
                  color="primary"
                  style={{ marginTop: "12px" }}
                  disabled={
                    Object.keys(errors).length !== 0 || isLoading ? true : false
                  }
                  loading={isLoading}
                >
                  Đăng nhập
                </Button>
              </FormItem>
            </Form>
            <div className="mt-3">
              Quên mật khẩu? <a href="/ForgotPassword">Nhấn vào đây</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
