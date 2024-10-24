import { AdminNavigationItem } from '../interfaces/AdminNavigationItem';

export const adminNavigationItems: AdminNavigationItem[] = [
    {
        id: 1,
        url: "/admin/courses",
        label: "Danh sách lớp học"
    },
    {
        id: 2,
        url: "/admin/subjects",
        label: "Môn học"
    },
    {
        id: 3,
        url: "/admin/lecturers",
        label: "Giảng viên"
    },
    {
        id: 4,
        url: "/admin/students",
        label: "Học viên"
    },
    {
        id: 5,
        url: "/admin/administrators",
        label: "Quản trị viên"
    },
    {
        id: 6,
        url: "/admin/guests",
        label: "Danh sách người dùng"
    }
]