import { FC, FormEvent, useState } from "react";
import { checkEmailExists } from "../api/idp";
import commonStyles from '../styles/common.module.css';
import SendButton from "./SendButton/SendButton";

type EmailFormProps ={
  onFinish: (email: string, isExist: boolean)=>void
}

export const EmailForm:FC<EmailFormProps> = ({onFinish}) => {
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);


  const onSubmit = async (e: FormEvent)=>{
    e.preventDefault();
    setDisabled(true)
    try {
      const { isExist } = await checkEmailExists(email); 
      onFinish(email, isExist);
    } catch (err) {
      console.log(err);
    }
    setDisabled(false)
  }

  return (
      <form onSubmit={onSubmit} className={commonStyles.formGrid}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className={commonStyles.input}
          disabled={disabled}
        />
        <SendButton type="submit" disabled={disabled} />
      </form>
  )
};
