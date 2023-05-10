import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { validatePassword } from "../../helpers/validation";
import commonStyles from "../../styles/common.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";

type OTPFormProps = {
  onBack: () => void;
  email: string;
};

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

const OTPForm: FC<OTPFormProps> = ({ email }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log("handle change", e.target.name, e.target.value);
    setValues((val) => ({
      ...val,
      [e.target.name]: e.target.value,
    }));
  }, []);

  useEffect(() => {
    if (!isDirty) return;
    const formErrors = validate(values);
    if (Object.values(formErrors).some((v) => !!v)) {
      setErrors(formErrors);
    }
  }, [values, isDirty]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsDirty(true);
    try {
      const formErrors = validate(values);

      if (formErrors) {
        setErrors(formErrors);
        throw new Error("Form values invalid");
      }
    } catch (err) {}

    setLoading(false);

    console.log(e);
  };

  return (
    <form className={commonStyles.stack} onSubmit={onSubmit}>
      <input type="email" hidden name="email" value={email} />
      <Input
        name="code"
        type="text"
        placeholder="Code"
        onChange={handleChange}
        value={values.code}
        error={errors.code}
        disabled={loading}
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
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
    </form>
  );
};
export default OTPForm;
