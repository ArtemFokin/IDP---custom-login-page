import { IDENTITY_SERVER_URI } from "../constants";

export type CheckEmailExistsResponse = {
  isExist: boolean;
};

export const checkEmailExists = async (email: string) => {
  const response = await fetch(
    `${IDENTITY_SERVER_URI}/api/account?email=${email}`
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Response is not ok");
  }

  return (await response.json()) as CheckEmailExistsResponse;
};

export type LoginBody = {
  email: string;
  password: string;
  returnUrl: string;
};

export type LoginResponse = {
  returnUrl: string;
};

export const login = async (body: LoginBody) => {
  const response = await fetch(`${IDENTITY_SERVER_URI}/api/account/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      Username: body.email,
      Password: body.password,
      ReturnUrl: body.returnUrl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Response is not ok");
  }

  return (await response.json()) as LoginResponse;
};
