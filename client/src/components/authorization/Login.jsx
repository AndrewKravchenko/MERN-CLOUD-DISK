import React, {useState} from 'react';
import cl from "./authorization.module.scss"
import {Input} from "../../utils/input/Input";
import {useDispatch} from "react-redux";
import {login} from "../../actions/user";

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  return (
    <div className={cl.authorization}>
      <div className={cl.authorization_header}>Authorization</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Enter your email"/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Enter your password"/>
      <button className={cl.authorization_btn} onClick={() => dispatch(login(email, password))}>Войти</button>
    </div>
  );
};
