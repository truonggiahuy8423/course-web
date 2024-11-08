export type Lecturer = {
  lecturerId: number;
  userId: number;
  username: string;
  email: string;
  dob: string;
  lastAccess: string;
  gender: boolean;
  avatar: string;
};

export type Subject = {
  subjectId: number;
  subjectName: string;
  description: string;
  image: string;
  createdDate: string;
  updatedDate: string;
};

export type Course = {
  courseId: number;
  createdDate: string;
  updatedDate: string;
  startDate: string;
  endDate: string;
  lecturers: Lecturer[];
  numberOfStudents: number;
  subject: Subject;
};

export interface GetCoursesResponse {
    total: number;
    courses: Course[];
  }


  export interface GetSubjectsResponse {
    total: number;
    subjects: Subject[];
  }