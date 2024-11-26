import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import Authentication from "./interceptor/Authentication";
import AccessControl from "./interceptor/AccessControl";
import NotFound from "../pages/not-found";
import Courses from "../pages/courses";
import AdminCourses from "../pages/admin/courses";
import AdminLecturers from "../pages/admin/lecturers";
import AdminStudents from "../pages/admin/students";
import AdminGuests from "../pages/admin/guests";
import AdminAdministrators from "../pages/admin/administrators";
import CourseInfor from "../pages/course/infor";
import CourseAttendance from "../pages/course/attendance";
import CourseResource from "../pages/course/resource";
import CourseConversation from "../pages/course/conversation";
import CourseResourceAssignment from "../pages/course/resource/assignment";
import UserPage from "../pages/user";
import AdminCourseInfor from "../pages/admin/course/infor";
import AdminCourseAttendance from "../pages/admin/course/attendance";
import AdminCourseResource from "../pages/admin/course/resource";
import AdminCourseResourceAssignment from "../pages/admin/course/resource/assignment";
import AdminCourseConversation from "../pages/admin/course/conversation";
import AdminStudent from "../pages/admin/student";
import AdminLecturer from "../pages/admin/lecturer";
import AdminGuest from "../pages/admin/guest";
import AdminAdministrator from "../pages/admin/administrator";
import AppLayout from "../layout/AppLayout";
import AdminLayout from "../layout/AdminLayout";
import AdminAdministratorsCreate from "../pages/admin/administrators/create";
import AdminGuestsCreate from "../pages/admin/guests/create";
import AdminLecturersCreate from "../pages/admin/lecturers/create";
import AdminStudentsCreate from "../pages/admin/students/create";
import AdminCoursesCreate from "../pages/admin/courses/create";
import AdminSubject from "../pages/admin/subject";
import AdminSubjects from "../pages/admin/subjects";
import AdminSubjectsCreate from "../pages/admin/subjects/create";
import AdminAdministratorsEdit from "../pages/admin/administrators/edit";
import CourseLayout from "../layout/CourseLayout";
import ProductsPage from "../pages/admin/products"
// import ListProduct from "../pages/products";
import ProductDetail from "../pages/product";
import StudentLayout from "../layout/StudentLayout";
import AdminStudentInfor from "../pages/admin/student";

// import About from '../components/About';
// import Contact from '../components/Contact';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route element={<AppLayout />}>
          {/* <Route
            path="/products"
            element={
              // <AccessControl>
              <Authentication>
                <ListProduct />
              </Authentication>
              // </AccessControl>
            }
          /> */}
          <Route
            path="/product/:id"
            element={
              // <AccessControl>
              <Authentication>
                <ProductDetail />
              </Authentication>
              // </AccessControl>
            }
          />
          <Route element={<CourseLayout isAdmin />}>
            <Route
              path="/course/:id/infor"
              element={
                <AccessControl>
                  <Authentication>
                    <CourseInfor />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/course/:id/attendance"
              element={
                <AccessControl>
                  <Authentication>
                    <CourseAttendance />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/course/:id/resource"
              element={
                <AccessControl>
                  <Authentication>
                    <CourseResource />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/course/:id/conversation"
              element={
                <AccessControl>
                  <Authentication>
                    <CourseConversation />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/course/:id/resource/assignment/:assignmentId"
              element={
                <AccessControl>
                  <Authentication>
                    <CourseResourceAssignment />
                  </Authentication>
                </AccessControl>
              }
            />
          </Route>
          <Route element={<CourseLayout isAdmin />}>
            <Route
              path="/admin/course/:id/infor"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminCourseInfor />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/course/:id/attendance"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminCourseAttendance />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/course/:id/resource"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminCourseResource />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/course/:id/resource/assignment/:assignmentId"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminCourseResourceAssignment />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/course/:id/conversation"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminCourseConversation />
                  </Authentication>
                </AccessControl>
              }
            />
          </Route>

          <Route element={<StudentLayout isAdmin />}>
            <Route
              path="/admin/student/:id/infor"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminStudentInfor />
                  </Authentication>
                </AccessControl>
              }
            />
          </Route>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin/courses"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminCourses />
                  </Authentication>
                </AccessControl>
              }
            />

            {/* Các route liên quan đến admin */}
            <Route
              path="/admin/lecturers"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminLecturers />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/students"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminStudents />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/guests"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminGuests />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/administrators"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminAdministrators />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/student/:id"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminStudent />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/courses/create"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminCoursesCreate />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/students/create"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminStudentsCreate />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/lecturer/:id"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminLecturer />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/lecturers/create"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminLecturersCreate />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/guest/:id"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminGuest />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/guests/create"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminGuestsCreate />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/administrator/:id"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminAdministrator />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/administrator/:id/edit"
              element={
                <Authentication>
                  <AdminAdministratorsEdit />
                </Authentication>
              }
            />
            <Route
              path="/admin/administrators/create"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminAdministratorsCreate />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/subject/:id"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminSubject />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/subjects"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminSubjects />
                  </Authentication>
                </AccessControl>
              }
            />
            <Route
              path="/admin/subjects/create"
              element={
                <AccessControl>
                  <Authentication>
                    <AdminSubjectsCreate />
                  </Authentication>
                </AccessControl>
              }
            />
          </Route>

          <Route
            path="/courses"
            element={
              <AccessControl>
                <Authentication>
                  <Courses />
                </Authentication>
              </AccessControl>
            }
          />

          {/* Các route liên quan đến user */}
          <Route
            path="/user/:id"
            element={
              <AccessControl>
                <Authentication>
                  <UserPage />
                </Authentication>
              </AccessControl>
            }
          />

          {/* Các route liên quan đến admin course details */}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
