import { FC } from "react";
import commonStyles from "../../styles/common.module.scss";

type OTPForm = {
    onBack: () => void;
    email: string;
};

const OTPForm: FC<OTPForm> = () => {
    const onSubmit = () => {};

    return (
        <form className={commonStyles.stack}>
            <input type="text" placeholder="Code" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Create Account</button>
        </form>
    );
};
export default OTPForm;
