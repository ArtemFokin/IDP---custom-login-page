import { FC, useCallback, useEffect, useRef } from "react";
import { Portal } from "react-portal";

// import { googleLogin } from "../api/idp";
import { GOOGLE_CLIENT_ID } from "../constants";

const googleCbName = "googleSignInCb";

type GoogleSignInProps = {
  returnUrl: string;
  createAccountAllowed: boolean;
};

export const GoogleSignIn: FC<GoogleSignInProps> = ({
  returnUrl,
  createAccountAllowed,
}) => {
  const isMountedRef = useRef(false);
  // const googleCallbackUrl =
  //   redirect_uri &&
  //   `${IDENTITY_SERVER_URI}/ExternalLogin/GoogleCallback?returnUrl=${redirect_uri}`;

  const callbackFunc = useCallback(
    async (response: string) => {
      console.log({
        response,
      });
      // await googleLogin({
      //   token: googleId,
      //   returnUrl: returnUrl,
      //   createAllowed: createAccountAllowed,
      // });
    },
    []
    // [createAccountAllowed, returnUrl]
  );

  useEffect(() => {
    // @ts-expect-error unexpected variable in window
    window[googleCbName] = callbackFunc;
  }, [callbackFunc]);

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
          data-callback={googleCbName}
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
