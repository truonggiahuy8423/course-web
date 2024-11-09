import { getRequest, postRequest } from "../routes/middleware/fetch";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAdmins = async ({ page, size }: any): Promise<any> => {
  const token = localStorage.getItem("token");
  console.log(token ? `Bearer  ${token}` : "");

  return fetch(`${apiUrl}/admin?page=${page}&size=${size}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token || ""}`,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).catch((e) => {
    throw new Error(e?.message || "Access failed/Network problem");
  });
};
export const getAdmin = async ({ id }: any): Promise<any> => {
  const token = localStorage.getItem("token");
  console.log(token ? `Bearer  ${token}` : "");

  return fetch(`${apiUrl}/admin/` + id, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token || ""}`,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).catch((e) => {
    throw new Error(e?.message || "Access failed/Network problem");
  });
};
export const createAdmin = async (data: any): Promise<any> => {
  const token = localStorage.getItem("token");
  console.log(token ? `Bearer  ${token}` : "");

  return fetch(`${apiUrl}/admin`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token || ""}`,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).catch((e) => {
    throw new Error(e?.message || "Access failed/Network problem");
  });
};
export const editAdmin = async (id: string, data: any): Promise<any> => {
  const token = localStorage.getItem("token");
  console.log(token ? `Bearer  ${token}` : "");

  return fetch(`${apiUrl}/admin/` + id, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token || ""}`,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).catch((e) => {
    throw new Error(e?.message || "Access failed/Network problem");
  });
};

export const deleteAdmin = async (id: number): Promise<any> => {
  const token = localStorage.getItem("token");
  console.log(token ? `Bearer  ${token}` : "");

  return fetch(`${apiUrl}/admin/` + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token || ""}`,
      Authorization: token ? `Bearer ${token}` : "",
    },
  }).catch((e) => {
    throw new Error(e?.message || "Access failed/Network problem");
  });
};
