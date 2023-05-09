import { login } from '../api/idp';
import commonStyles from '../styles/common.module.css';
import {FC, FormEvent, useState} from 'react';
import SendButton from './SendButton/SendButton';

type PasswordFormProps = {
  email: string;
  onBack: ()=>void;
  returnUrl: string;
}


export const PasswordForm:FC<PasswordFormProps> = ({email, onBack, returnUrl}) => {
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e: FormEvent)=>{
    e.preventDefault();
    setDisabled(true);
    
    try {
      const response = await login({
        email,
        password,
        returnUrl: returnUrl.toString(),
      });

      window.location.href = response.returnUrl;
    } catch (err) {
      console.log(err);
    }
    
    
    setDisabled(false);
    
  }
  return (
    <div className={commonStyles.stack}>
      <p className={commonStyles.text}>
        Enter Password for <br />
        {email}
      </p>
      <form onSubmit={handleSubmit} className={commonStyles.formGrid}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className={commonStyles.input}
          disabled={disabled}
        />
        <SendButton type="submit" disabled={disabled} />
      </form>
      <div onClick={onBack}>Back</div>
    </div>
  )
};
