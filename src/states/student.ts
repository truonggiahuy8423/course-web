import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export type Student = {
    studentId: number;
    name: string;
    gender: string;
    dob: string;
    email: string;
};
