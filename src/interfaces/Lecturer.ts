import { Lecturer } from '../pages/admin/lecturers'; // Adjust the import path as necessary

export interface GetLecturersResponse {
    total: number;
    lecturers: Lecturer[];
  }