import { AiOutlineSend } from "react-icons/ai";
import styles from "./styles.module.scss";
import { FC, ButtonHTMLAttributes } from "react";

const SendButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button className={styles.btn} {...props}>
            <AiOutlineSend />
        </button>
    );
};
export default SendButton;
