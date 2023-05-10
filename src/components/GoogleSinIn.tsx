import { FC, useEffect, useRef } from "react";
import { Portal } from "react-portal";

import { GOOGLE_CLIENT_ID, IDENTITY_SERVER_URI } from "../constants";

export const GoogleSignIn: FC<{ redirect_uri: string }> = ({
  redirect_uri,
}) => {
  const isMountedRef = useRef(false);
  const googleCallbackUrl =
    redirect_uri &&
    `${IDENTITY_SERVER_URI}/ExternalLogin/GoogleCallback?returnUrl=${redirect_uri}`;
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
          data-login_uri={googleCallbackUrl}
          data-auto_prompt="false"
        />
      </Portal>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="pill"
        data-logo_alignment="left"
      />
    </>
  );
};
