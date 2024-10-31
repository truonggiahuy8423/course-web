import { useNavigate } from "react-router-dom";
import { errorFilter } from "../../function/errorFilter";

type GetRequestProps = {
  url: string;
  headers?: object;
  params?: object;
};
export async function getRequest<T>(props: GetRequestProps): Promise<T> {
  const { url, headers, params } = props;
  const queryParams = new URLSearchParams(JSON.stringify(params)).toString();

  return await fetch(`${url}${queryParams ? `?${queryParams}` : ``}`, {
    method: "GET",
    headers: {
      ...headers,
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        const res = await response.json();
        errorFilter(res.error);
      }
      const res: Promise<T> = response.json();
      return res;
    })
    .catch((e) => {
      throw new Error(e.message || "Network error");
    });
}

type PostRequestProps<U> = {
  url: string;
  body: U;
  headers?: object;
  params?: object;
};

export async function postRequest<T, U>(
  props: PostRequestProps<U>
): Promise<T> {
  //   const navigate = useNavigate();
  const { url, body, headers, params } = props;
  const queryParams = new URLSearchParams(JSON.stringify(params)).toString();

  console.log("postRequest");

  return await fetch(`${url}${queryParams ? `?${queryParams}` : ``}`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(body),
  })
    .then(async (response) => {
      console.log("post1");

      if (!response.ok) {
        const res = await response.json();
        errorFilter(res.error);
      }
      const res: Promise<T> = response.json();
      return res;
    })
    .catch((e) => {
      console.log("post3");
      throw new Error(e.message || "Network error");
    });
}
