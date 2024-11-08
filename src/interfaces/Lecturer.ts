import { Lecturer } from "./Course";

export interface GetLecturersResponse {
    total: number;
    lecturers: Lecturer[];
  }