import { User } from "../states/auth";

export type Folder = {
    folderId: number;
    title: string;
    createdDate: string;
    updatedDate: string;
    parentId: number;
    courseId: number;
  };
  
export type File = {
    fileId: number;
    title: string;
    createdDate: string;
    updatedDate: string;
    folderId: number;
    fileName: string;
    extension: string;
    decoded: string;
    user: User;
};

