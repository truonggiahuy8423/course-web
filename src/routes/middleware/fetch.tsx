import { useNavigate } from "react-router-dom";

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
        if (res?.error?.errorCode === 10002) {
          window.location.href = "/login";
        }
        throw new Error(
          res?.error.errorMessage?.toString() || response.status.toString()
        );
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
        console.log(response);
        const res = await response.json();
        console.log("post" + res);
        if (res?.error?.errorCode === 10002) {
          window.location.href = "/login";
        }
        throw new Error(
          res?.error.errorMessage?.toString() || response.status.toString()
        );
      }
      console.log("post2");
      const res: Promise<T> = response.json();
      console.log("postRequest");
      return res;
    })
    .catch((e) => {
      console.log("post3");
      throw new Error(e.message || "Network error");
    });
}
