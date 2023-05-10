export const emailRegEx =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
export const isValidEmail = (email: string) =>
  emailRegEx.test(String(email).toLowerCase());

export const validateTrim = (v: string) => (!v.trim() ? "Invalid value" : true);

const isPasswordLengthValid = (password: string) => password.length > 5;
const isPasswordLowercaseValid = (password: string) =>
  /(?=.*[a-z])/.test(password);
const isPasswordDigitValid = (password: string) => /(?=.*[0-9])/.test(password);
const isPasswordUppercaseValid = (password: string) =>
  /(?=.*[A-Z])/.test(password);
const isPasswordNonAlphanumericValid = (password: string) =>
  /(?=.*[-+_!@#$%^&*.,?()=])/.test(password);

export const validatePassword = (_password: string | undefined) => {
  const password = _password?.trim() || "";
  const requirements = [
    {
      message: "Passwords length at least 6 characters.",
      validate: isPasswordLengthValid,
    },
    {
      message: "Passwords must have at least one digit ('0'-'9').",
      validate: isPasswordDigitValid,
    },
    {
      message: "Passwords must have at least one lowercase ('a'-'z').",
      validate: isPasswordLowercaseValid,
    },
    {
      message: "Passwords must have at least one uppercase ('A'-'Z').",
      validate: isPasswordUppercaseValid,
    },
    {
      message: "Passwords must have at least one non alphanumeric character.",
      validate: isPasswordNonAlphanumericValid,
    },
  ];
  if (!password) {
    return "Required";
  }
  const error = requirements.find((r) => !r.validate(password));
  if (error) {
    return error.message;
  }
  return false;
};
