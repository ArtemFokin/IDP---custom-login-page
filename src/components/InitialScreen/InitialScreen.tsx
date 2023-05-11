import { FC } from "react";

import commonStyles from "../../styles/common.module.scss";
import { EmailForm } from "../EmailForm";
import { GoogleSignIn } from "../GoogleSinIn";
import styles from "./styles.module.css";

type InitialScreenProps = {
  createAccountAllowed: boolean;
  onEmailFormFinish: (email: string, isExist: boolean) => void;
  returnUrl: string;
};
const InitialScreen: FC<InitialScreenProps> = ({
  onEmailFormFinish,
  createAccountAllowed,
  returnUrl,
}) => {
  return (
    <div className={commonStyles.stack}>
      <p className={commonStyles.text}>Login to NiftyBridge Wallet</p>
      <div className={styles.googleWrapper}>
        <GoogleSignIn
          returnUrl={returnUrl}
          createAccountAllowed={createAccountAllowed}
        />
      </div>
      <EmailForm onFinish={onEmailFormFinish} />
    </div>
  );
};

export default InitialScreen;
