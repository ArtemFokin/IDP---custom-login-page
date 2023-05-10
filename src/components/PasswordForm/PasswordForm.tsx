import { FC, FormEvent, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { login } from "../../api/idp";
import commonStyles from "../../styles/common.module.scss";
import Input from "../Input/Input";
import SendButton from "../SendButton/SendButton";
import styles from "./styles.module.css";

type PasswordFormProps = {
  email: string;
  onBack: () => void;
  returnUrl: string;
};

export const PasswordForm: FC<PasswordFormProps> = ({
  email,
  onBack,
  returnUrl,
}) => {
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const response = await login({
        email,
        password,
        returnUrl: returnUrl.toString(),
      });

      window.location.href = response.returnUrl;
    } catch (err) {
      console.log(err);
    }

    setDisabled(false);
  };
  return (
    <div className={commonStyles.stack}>
      <div className={styles.headerBox}>
        <p className={commonStyles.text}>
          <IoChevronBackCircleOutline
            onClick={onBack}
            className={commonStyles.inlineBackBtn}
          />
          Enter Password for
          <br />
          {email}
        </p>
      </div>
      <form onSubmit={handleSubmit} className={commonStyles.oneLineForm}>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          disabled={disabled}
          autoFocus
        />
        <SendButton type="submit" disabled={disabled} />
      </form>
    </div>
  );
};
