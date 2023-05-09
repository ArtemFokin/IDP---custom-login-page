import {  useEffect, useMemo, useRef, useState } from "react";
import { GoogleSignIn } from "../components/GoogleSinIn";
import { PasswordForm } from "../components/PasswordForm";
import commonStyles from '../styles/common.module.css';
import { EmailForm } from "../components/EmailForm";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { checkEmailExists } from "../api/idp";

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
  
  const returnUrl = useMemo(getReturnUrl, []);
  const redirect_uri = returnUrl?.searchParams.get("redirect_uri");
  
  useEffect(()=>{
    checkEmailExists("aewrwer").then(console.log).catch(console.log); 
  }, [])

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
