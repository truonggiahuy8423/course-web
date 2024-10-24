export interface AccessControlResponse {
  status: number;
  message: string;
  redirectUrl: string;
}

export interface AccessControlRequest {
  url: string;
}
