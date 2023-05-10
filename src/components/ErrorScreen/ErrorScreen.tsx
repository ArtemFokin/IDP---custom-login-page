import { FC } from "react";

import commonStyles from "../../styles/common.module.scss";
import Button from "../Button/Button";

type ErrorScreenProps = {
  message: string;
  onReset: () => void;
};

const ErrorScreen: FC<ErrorScreenProps> = ({ message, onReset }) => {
  return (
    <div className={commonStyles.stack}>
      <div className={commonStyles.text}>{message}</div>
      <Button onClick={onReset}>Try Again</Button>
    </div>
  );
};
export default ErrorScreen;
