import { WALLET_API_URI } from "../constants";

export type GenerateOTPCodeBody = {
  email: string;
};

export type GenerateOTPCodeResponse = {
  email: string;
};

export const generateOTPCode = async (body: GenerateOTPCodeBody) => {
  const response = await fetch(`${WALLET_API_URI}/auth/generateOtpCode`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Response is not ok");
  }

  return (await response.json()) as GenerateOTPCodeResponse;
};

export type CreateUserByOTPBody = {
  email: string;
  otpCode: string;
  password: string;
};

export type CreateUserByOTPResponse = {
  email: string;
};

export const createUserByOTP = async (body: CreateUserByOTPBody) => {
  const response = await fetch(`${WALLET_API_URI}/auth/createUserByOtp`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Response is not ok");
  }

  return (await response.json()) as CreateUserByOTPResponse;
};
