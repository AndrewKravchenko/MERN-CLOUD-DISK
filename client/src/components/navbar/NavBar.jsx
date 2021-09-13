import React from 'react';
import cl from "./navbar.module.scss"
import Logo from "../../assets/img/navbar-logo.svg"
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

export const NavBar = () => {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  return (
    <div className={cl.navbar}>
      <div className={cl.container}>
        <img src={Logo} alt=""/>
        <div className={cl.navbar_header}>MERN CLOUD</div>
        {!isAuth && <div className={cl.navbar_login}><NavLink to="/login">Войти</NavLink></div> }
        {!isAuth && <div><NavLink to="/registration">Registration</NavLink></div> }
        {isAuth && <div className={cl.navbar_login} onClick={() => dispatch(logout()) }>Exit</div> }
      </div>
    </div>
  );
};