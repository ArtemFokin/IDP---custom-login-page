import { useMemo, useRef, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import { EmailForm } from "../components/EmailForm";
import { GoogleSignIn } from "../components/GoogleSinIn";
import OTPForm from "../components/OTPForm/OTPForm";
import { PasswordForm } from "../components/PasswordForm/PasswordForm";
import commonStyles from "../styles/common.module.scss";

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

enum Screens {
  DEFAULT = "DEFAULT",
  PASSWORD_EXISTS = "PASSWORD_EXISTS",
  OTP = "OTP",
}

const LoginPage = () => {
  const [activeScreen, setActiveScreen] = useState(Screens.DEFAULT);

  const [email, setEmail] = useState("");

  const animRef = useRef<HTMLDivElement | null>(null);

  const returnUrl = useMemo(getReturnUrl, []);
  const redirect_uri = returnUrl?.searchParams.get("redirect_uri");

  const onEmailFormFinish = (userEmail: string, isExist: boolean) => {
    if (!redirect_uri) return;
    if (isExist) {
      setEmail(userEmail);
      setActiveScreen(Screens.PASSWORD_EXISTS);
    } else {
      //TODO: if we on claim page
      setEmail(userEmail);
      setActiveScreen(Screens.OTP);
      // const redurectURL = new URL(redirect_uri);
      // redurectURL.searchParams.append("error", "NotFound");
      // redurectURL.searchParams.append("email", email);
      // window.location.href = redurectURL.toString();
    }
  };

  const displayDefaultScreen = () => {
    setEmail("");
    setActiveScreen(Screens.DEFAULT);
  };

  const defaultScreen = (
    <div className={commonStyles.stack}>
      <GoogleSignIn redirect_uri={redirect_uri || ""} />
      <EmailForm onFinish={onEmailFormFinish} />
    </div>
  );

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case Screens.OTP:
        return <OTPForm onBack={displayDefaultScreen} email={email} />;
      case Screens.PASSWORD_EXISTS:
        return (
          <PasswordForm
            email={email}
            onBack={displayDefaultScreen}
            returnUrl={returnUrl?.toString() || ""}
          />
        );
      case Screens.DEFAULT:
      default:
        return defaultScreen;
    }
  };

  if (!returnUrl || !redirect_uri) {
    return <div>ReturnUrl not found</div>;
  }

  return (
    <div>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={activeScreen}
          nodeRef={animRef}
          addEndListener={(done) => {
            animRef.current?.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <div ref={animRef}>{renderActiveScreen()}</div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default LoginPage;
