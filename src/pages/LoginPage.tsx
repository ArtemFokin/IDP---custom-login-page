import { FormEvent, useEffect, useRef, useState } from "react";
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
  const isMountedRef = useRef<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const returnUrl = getReturnUrl();
  const redirect_uri = returnUrl?.searchParams.get("redirect_uri");
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

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${IDENTITY_SERVER_URI}/api/account/login`, {
        method: "POST",
        body: JSON.stringify({
          Username: email,
          Password: password,
          ReturnUrl: returnUrl?.toString(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Response is not OK");
      }
      // console.log(await response.text());

      const data = await response.json();

      console.log({ data });

      window.location = data.returnUrl;
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
        <div
          id="g_id_onload"
          data-client_id={GOOGLE_CLIENT_ID}
          data-login_uri={googleCallbackUrl}
          data-auto_prompt="false"
        />
        <div
          className="g_id_signin"
          data-type="standard"
          data-size="large"
          data-theme="outline"
          data-text="sign_in_with"
          data-shape="rectangular"
          data-logo_alignment="left"
        />
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button name="button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
