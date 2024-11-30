export interface LoginResponse {
    userId: number;
    username: string;
    email: string;
    phone: string;
    gender: boolean; // Female true - Male false
    dob: string; // Có thể là `Date` nếu API trả về đúng kiểu ngày tháng
    countryCode: string;
    token: string;
    avatar: string
    role: string;
    balance: number;
  }