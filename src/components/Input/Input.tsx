import { FC, InputHTMLAttributes, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import cs from "classnames";

import styles from "./styles.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input: FC<InputProps> = ({ error, type, ...restProps }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";
  return (
    <div className={styles.container}>
      <input
        {...restProps}
        className={cs(
          styles.input,
          isPassword ? styles["input--password"] : ""
        )}
        type={isPassword ? (passwordVisible ? "text" : "password") : type}
      />
      {isPassword && (
        <div
          className={styles.endAdornment}
          onClick={() => setPasswordVisible((v) => !v)}
        >
          {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
export default Input;
