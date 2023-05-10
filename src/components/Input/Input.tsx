import { FC, InputHTMLAttributes } from "react";

import styles from "./styles.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input: FC<InputProps> = ({ error, ...restProps }) => {
  return (
    <div className={styles.container}>
      <input {...restProps} className={styles.input} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
export default Input;
