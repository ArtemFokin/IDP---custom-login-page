import { FC, useEffect, useRef } from "react";
import { GOOGLE_CLIENT_ID } from "../constants";
import { Portal } from 'react-portal';

export const GoogleSignIn: FC<{ callbackUrl: string }> = ({ callbackUrl }) => {
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;
    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Portal>
        <div
          id="g_id_onload"
          data-client_id={GOOGLE_CLIENT_ID}
          data-login_uri={callbackUrl}
          data-auto_prompt="false"
        />
      </Portal>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      />
    </>
  );
};
