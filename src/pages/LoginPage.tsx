import { FormEvent, useEffect, useRef, useState } from "react";
import { checkEmailExists, login } from "../api/idp";
import { sendAccountNotFound } from "../api/parentWindow";
import { GoogleSignIn } from "../components/GoogleSinIn";
import { GOOGLE_CLIENT_ID, IDENTITY_SERVER_URI } from "../constants";

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

      // window.location = response.returnUrl;
      window.open(response.returnUrl);
    } catch (err) {
      console.log(err);
    }
  };

  if (!returnUrl || !redirect_uri) {
    return <div>ReturnUrl not found</div>;
  }

  return (
    <div className="App">
      <div>
        {googleCallbackUrl && <GoogleSignIn callbackUrl={googleCallbackUrl} />}
        {!showPasswordForm && (
          <form onSubmit={onEmailFormSubmit}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        )}
        {showPasswordForm && (
          <form onSubmit={onPasswordFormSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
