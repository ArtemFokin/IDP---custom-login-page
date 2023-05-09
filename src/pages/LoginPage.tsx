import { FormEvent, useRef, useState } from "react";
import { checkEmailExists, login } from "../api/idp";
import { sendAccountNotFound } from "../api/parentWindow";
import { GoogleSignIn } from "../components/GoogleSinIn";
import { IDENTITY_SERVER_URI } from "../constants";
import styles from "./LoginPage.module.css";
import { PasswordForm } from "../components/PasswordForm/PasswordForm";
import commonStyles from '../styles/common.module.css';
import { EmailForm } from "../components/EmailForm";
import { SwitchTransition, CSSTransition } from "react-transition-group";

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
  const [emailForPasswordForm, setEmailForPasswordForm] = useState('');
  const animRef = useRef<HTMLDivElement | null>(null);
  const returnUrl = getReturnUrl();
  const redirect_uri = returnUrl?.searchParams.get("redirect_uri");

  const onEmailFormFinish = (email:string, isExist: boolean)=>{
    if(!redirect_uri) return;
    if (isExist) {
      setEmailForPasswordForm(email);
    } else {
      const redurectURL = new URL(redirect_uri);
      redurectURL.searchParams.append("error", "NotFound");
      redurectURL.searchParams.append("email", email);
      window.location.href = redurectURL.toString();
    }
  }

  const onPasswordFormBack = ()=>{
    setEmailForPasswordForm('');
  }

  if (!returnUrl || !redirect_uri) {
    return <div>ReturnUrl not found</div>;
  }

  return (
    <div>
      <SwitchTransition mode="out-in">
          <CSSTransition
            key={emailForPasswordForm}
            nodeRef={animRef}
            addEndListener={(done) => {
              animRef.current?.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div ref={animRef}>
              {emailForPasswordForm ? (
                  <PasswordForm email={emailForPasswordForm} onBack={onPasswordFormBack} returnUrl={returnUrl.toString()} />
              ) : <div className={commonStyles.stack}>
                <GoogleSignIn redirect_uri={redirect_uri} />
                <EmailForm onFinish={onEmailFormFinish} />
              </div>}
            </div>
          </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default LoginPage;
