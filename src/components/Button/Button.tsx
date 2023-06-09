import { ButtonHTMLAttributes, FC } from "react";

import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => {
  return (
    <button {...props} className={styles.button}>
      {props.children}
    </button>
  );
};
export default Button;
