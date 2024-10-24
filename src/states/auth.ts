import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export type User = {
  userId: number | null;
  username: string;
  email: string;
  phone: string;
  gender: boolean | null;  // true for Female, false for Male
  dob: string | null;      // Assuming date is a string in ISO format
  countryCode: string;
  token: string;
  avatar: string
};


// Khởi tạo state user
export const userState = atom<User | null>({
  key: "userState", // Unique ID for this atom
  default: {
    userId: null,
    username: "",
    email: "",
    phone: "",
    gender: null,
    dob: null,
    countryCode: "",
    token: "",
    avatar: "",
  },
  effects_UNSTABLE: [persistAtom],
});