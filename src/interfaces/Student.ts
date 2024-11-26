export interface StudentResponse {
    studentId: number;
    name: string;
    gender: string;
    dob: string;
    email: string;
}

export interface StudentCourseResponse {
    courseId: number;
    startDate: string;
    endDate: string;
  }
  
  export interface StudentDetailResponse {
    studentId: number;
    userId: number;
    username: string;
    email: string;
    gender: boolean; // Female true, Male false
    dob: string; // Use ISO-8601 date format as strings
    studentCourses: StudentCourseResponse[];
  }
  