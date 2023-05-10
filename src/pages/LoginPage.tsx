import { useMemo, useRef, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import ErrorScreen from "../components/ErrorScreen/ErrorScreen";
import InitialScreen from "../components/InitialScreen/InitialScreen";
import OTPForm from "../components/OTPForm/OTPForm";
import { PasswordForm } from "../components/PasswordForm/PasswordForm";

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
  ERROR = "ERROR",
}

const LoginPage = () => {
  const [activeScreen, setActiveScreen] = useState(Screens.DEFAULT);

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const onError = (msg: string) => {
    setErrorMessage(msg);
    setActiveScreen(Screens.ERROR);
  };

  const displayDefaultScreen = () => {
    setErrorMessage("");
    setEmail("");
    setActiveScreen(Screens.DEFAULT);
  };

  const renderActiveScreen = () => {
    if (!returnUrl || !redirect_uri) return null;

    switch (activeScreen) {
      case Screens.OTP:
        return (
          <OTPForm
            onBack={displayDefaultScreen}
            email={email}
            onError={onError}
            returnUrl={returnUrl.toString()}
          />
        );
      case Screens.PASSWORD_EXISTS:
        return (
          <PasswordForm
            email={email}
            onBack={displayDefaultScreen}
            returnUrl={returnUrl.toString()}
          />
        );
      case Screens.ERROR:
        return (
          <ErrorScreen message={errorMessage} onReset={displayDefaultScreen} />
        );
      case Screens.DEFAULT:
      default:
        return (
          <InitialScreen
            redirect_uri={redirect_uri}
            onEmailFormFinish={onEmailFormFinish}
          />
        );
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
