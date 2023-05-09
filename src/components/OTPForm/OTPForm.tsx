import { FC, FormEvent } from "react";

import commonStyles from "../../styles/common.module.scss";

type OTPFormProps = {
  onBack: () => void;
  email: string;
};

const OTPForm: FC<OTPFormProps> = () => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={commonStyles.stack} onSubmit={onSubmit}>
      <input type="text" placeholder="Code" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button type="submit">Create Account</button>
    </form>
  );
};
export default OTPForm;
