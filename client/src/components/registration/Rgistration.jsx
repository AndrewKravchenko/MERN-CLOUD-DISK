import React, {useState} from 'react';
import {registration} from "../../actions/user";
import {Input} from "../../utils/input/Input";
import cl from './registartion.module.scss';


export const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className={cl.registration}>
      <div className={cl.registration_header}>Registration</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Enter your email"/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Enter your password"/>
      <button className={cl.registration_btn} onClick={() => registration(email, password)}>Enter</button>
    </div>
  );
};
