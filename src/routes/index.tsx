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

// import About from '../components/About';
// import Contact from '../components/Contact';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

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

        {/* Các route liên quan đến course details */}
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

        {/* Các route liên quan đến admin chi tiết useccr */}
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
          path="/admin/administrator/:id"
          element={
            <AccessControl>
              <Authentication>
                <AdminAdministrator />
              </Authentication>
            </AccessControl>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
