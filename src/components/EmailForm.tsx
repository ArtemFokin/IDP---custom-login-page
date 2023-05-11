import { FC, FormEvent, useEffect, useState } from "react";

import { checkEmailExists } from "../api/idp";
import { isValidEmail } from "../helpers/validation";
import commonStyles from "../styles/common.module.scss";
import Input from "./Input/Input";
import SendButton from "./SendButton/SendButton";

type EmailFormProps = {
  onFinish: (email: string, isExist: boolean) => void;
};

export const EmailForm: FC<EmailFormProps> = ({ onFinish }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const validate = (emailValue: string) => {
    if (!isValidEmail(emailValue)) {
      return "Incorrect Email";
    }
  };

  useEffect(() => {
    setEmailError("");
  }, [email]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const error = validate(email);
      if (error) {
        throw new Error(error);
      }
      const { isExist } = await checkEmailExists(email);
      onFinish(email, isExist);
    } catch (err: any) {
      setEmailError(err.message || "Internal error");
      console.error(err);
    }
    setDisabled(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={commonStyles.oneLineForm}>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          disabled={disabled}
          autoFocus
        />
        <SendButton type="submit" disabled={disabled} />
      </form>
      {emailError && <p className={commonStyles.textError}>{emailError}</p>}
    </div>
  );
};
