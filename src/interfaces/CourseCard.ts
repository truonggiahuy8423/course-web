import { CourseCard } from '../pages/admin/products'; // Adjust the import path as necessary

export interface GetCourseCardResponse {
    total: number;
    courses: CourseCard[];
  }