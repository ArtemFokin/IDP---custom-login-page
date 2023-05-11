import { useMemo, useRef, useState } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";

import ErrorScreen from "../components/ErrorScreen/ErrorScreen";
import InitialScreen from "../components/InitialScreen/InitialScreen";
import OTPForm from "../components/OTPForm/OTPForm";
import { PasswordForm } from "../components/PasswordForm/PasswordForm";
import styles from "./styles.module.scss";

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

enum Scopes {
  createAllowed = "createAllowed",
  openid = "openid",
  profile = "profile",
  offline_access = "offline_access",
}

const LoginPage = () => {
  const [activeScreen, setActiveScreen] = useState(Screens.DEFAULT);

  const [activeEmail, setActiveEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const animRef = useRef<HTMLDivElement | null>(null);

  const returnUrl = useMemo(getReturnUrl, []);
  const redirect_uri = returnUrl?.searchParams.get("redirect_uri");

  const scopes = useMemo(
    () =>
      (returnUrl?.searchParams.get("scope")?.split(" ") || []).map((sc) =>
        sc.trim()
      ) as Scopes[],
    [returnUrl]
  );

  const createAccountAllowed = useMemo(
    () => scopes.includes(Scopes.createAllowed),
    [scopes]
  );

  const onEmailFormFinish = (userEmail: string, isExist: boolean) => {
    if (!redirect_uri) return;
    if (isExist) {
      setActiveEmail(userEmail);
      setActiveScreen(Screens.PASSWORD_EXISTS);
    } else if (createAccountAllowed) {
      setActiveEmail(userEmail);
      setActiveScreen(Screens.OTP);
    } else {
      const redurectURL = new URL(redirect_uri);
      redurectURL.searchParams.append("error", "NotFound");
      redurectURL.searchParams.append("email", userEmail);
      window.location.href = redurectURL.toString();
    }
  };

  const onError = (msg: string) => {
    setErrorMessage(msg);
    setActiveScreen(Screens.ERROR);
  };

  const resetScreens = () => {
    setErrorMessage("");
    setActiveEmail("");
    setActiveScreen(Screens.DEFAULT);
  };

  const renderActiveScreen = () => {
    if (!returnUrl || !redirect_uri) return null;

    switch (activeScreen) {
      case Screens.OTP:
        return (
          <OTPForm
            onBack={resetScreens}
            email={activeEmail}
            onError={onError}
            returnUrl={returnUrl.toString()}
          />
        );
      case Screens.PASSWORD_EXISTS:
        return (
          <PasswordForm
            email={activeEmail}
            onBack={resetScreens}
            returnUrl={returnUrl.toString()}
          />
        );
      case Screens.ERROR:
        return <ErrorScreen message={errorMessage} onReset={resetScreens} />;
      case Screens.DEFAULT:
      default:
        return (
          <InitialScreen
            createAccountAllowed={createAccountAllowed}
            returnUrl={returnUrl.toString()}
            onEmailFormFinish={onEmailFormFinish}
            onError={onError}
          />
        );
    }
  };

  if (!returnUrl || !redirect_uri) {
    return <div>ReturnUrl not found</div>;
  }

  return (
    <div className={styles.container}>
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
