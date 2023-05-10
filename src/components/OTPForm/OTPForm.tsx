import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";

import { generateOTPCode } from "../../api/ncwallet";
import { validatePassword } from "../../helpers/validation";
import commonStyles from "../../styles/common.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

type FormValues = {
  code: string;
  password: string;
  confirmPassword: string;
};

const initialValues: FormValues = {
  code: "",
  password: "",
  confirmPassword: "",
};

type FormErrors = Partial<FormValues>;

const initialErrors: FormErrors = {};

const validate = (values: FormValues) => {
  console.log(values);
  const errors: FormErrors = {};

  if (!values.code) {
    errors.code = "Required";
  }
  const passwordError = validatePassword(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password && values.confirmPassword !== values.password) {
    errors.confirmPassword = "passwords not equal";
  }

  return errors;
};

type OTPFormProps = {
  onBack: () => void;
  onError: (msg: string) => void;
  email: string;
  returnUrl: string;
};

const OTPForm: FC<OTPFormProps> = ({ email, onBack, onError }) => {
  const isMountedRef = useRef(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [formError, setFormError] = useState("");

  const sendOtpCode = useCallback(() => generateOTPCode({ email }), [email]);

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;
    onError("Otp code wasn't sent, try again later");
    // sendOtpCode().catch((err) => {
    //   console.error(err);
    //   onError("Otp code wasn't sent, try again later");
    // });
  }, [sendOtpCode, onError]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValues((val) => ({
      ...val,
      [e.target.name]: e.target.value,
    }));
    setFormError("");
  }, []);

  useEffect(() => {
    if (!isDirty) return;
    const formErrors = validate(values);
    setErrors(formErrors);
  }, [values, isDirty]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsDirty(true);
    try {
      const formErrors = validate(values);

      if (Object.values(formErrors).some((v) => !v)) {
        setErrors(formErrors);
        throw new Error("Not all values are valid");
      }

      // await createUserByOTP({
      //   email,
      //   otpCode: values.code,
      //   password: values.password,
      // });

      // const response = await login({
      //   email,
      //   password: values.password,
      //   returnUrl: returnUrl.toString(),
      // });

      // window.location.href = response.returnUrl;
    } catch (err: any) {
      console.error(err.message);
      setFormError(err.message || "Account wasn't created");
    }

    setLoading(false);
  };

  return (
    <form className={commonStyles.stack} onSubmit={onSubmit}>
      <p className={commonStyles.text}>
        <IoChevronBackCircleOutline
          onClick={onBack}
          className={commonStyles.inlineBackBtn}
        />
        Confirm email to create Account
        <br />
        {email}
      </p>
      {/* <input type="name" hidden name="email" value={email} /> */}
      <Input
        name="code"
        type="text"
        placeholder="Code from email"
        onChange={handleChange}
        value={values.code}
        error={errors.code}
        disabled={loading}
        autoFocus
      />
      <Input
        name="password"
        type="password"
        placeholder="New password"
        onChange={handleChange}
        value={values.password}
        error={errors.password}
        disabled={loading}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        value={values.confirmPassword}
        error={errors.confirmPassword}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        Create Account
      </Button>
      {formError && <p className={commonStyles.textError}>{formError}</p>}
    </form>
  );
};
export default OTPForm;
