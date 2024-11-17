import { Lecturer } from "../pages/admin/lecturers";

export interface GetLecturerResponse {
    lecturers: Lecturer[]
    total: number
}