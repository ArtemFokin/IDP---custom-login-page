import { FormEvent, useState } from "react";
import { checkEmailExists, login } from "../api/idp";
import { sendAccountNotFound } from "../api/parentWindow";
import { GoogleSignIn } from "../components/GoogleSinIn";
import { IDENTITY_SERVER_URI } from "../constants";
import styles from "./LoginPage.module.css";

const getReturnUrl = (): URL | undefined => {
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const returnUrlRaw = searchParams.get("ReturnUrl");
    if (!returnUrlRaw) throw new Error("ReturnUrl not found");
    const returnUrl = new URL(returnUrlRaw);
    return returnUrl;
  } catch (err) {
    console.log(err);
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const returnUrl = getReturnUrl();
  const redirect_uri = returnUrl?.searchParams.get("redirect_uri");
  const googleCallbackUrl =
    redirect_uri &&
    `${IDENTITY_SERVER_URI}/ExternalLogin/GoogleCallback?returnUrl=${redirect_uri}`;

  const onEmailFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { isExist } = await checkEmailExists(email);

      if (isExist) {
        setShowPasswordForm(true);
      } else {
        sendAccountNotFound(email);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onPasswordFormSubmit = async (e: FormEvent) => {
    if (!returnUrl) return;
    e.preventDefault();

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
  };

  if (!returnUrl || !redirect_uri) {
    return <div>ReturnUrl not found</div>;
  }

  return (
    <div className="App">
      <div className={styles.formsWrapper}>
        {googleCallbackUrl && <GoogleSignIn callbackUrl={googleCallbackUrl} />}
        {!showPasswordForm && (
          <form onSubmit={onEmailFormSubmit} className={styles.fluidForm}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
          </form>
        )}
        {showPasswordForm && (
          <form onSubmit={onPasswordFormSubmit} className={styles.fluidForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
