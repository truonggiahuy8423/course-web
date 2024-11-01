import { Course } from '../pages/admin/courses'; // Adjust the import path as necessary

export interface GetCoursesResponse {
    total: number;
    courses: Course[];
  }