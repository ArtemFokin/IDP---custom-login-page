import { FC } from "react";

import commonStyles from "../../styles/common.module.scss";
import { EmailForm } from "../EmailForm";
import { GoogleSignIn } from "../GoogleSinIn";
import styles from "./styles.module.css";

type InitialScreenProps = {
  redirect_uri: string;
  onEmailFormFinish: (email: string, isExist: boolean) => void;
};
const InitialScreen: FC<InitialScreenProps> = ({
  redirect_uri,
  onEmailFormFinish,
}) => {
  return (
    <div className={commonStyles.stack}>
      <p className={commonStyles.text}>Login to NiftyBridge Wallet</p>
      <div className={styles.googleWrapper}>
        <GoogleSignIn redirect_uri={redirect_uri || ""} />
      </div>
      <EmailForm onFinish={onEmailFormFinish} />
    </div>
  );
};

export default InitialScreen;
