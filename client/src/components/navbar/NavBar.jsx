import React from "react";
import {NavLink} from "react-router-dom";
import Logo from "../../assets/img/navbar-logo.svg"
import cl from "./navbar.module.scss"

export const NavBar = () => {
  return (
    <div className={cl.navbar}>
      <div className={cl.container}>
        <img src={Logo} alt="" className={cl.navbar_logo}/>
        <div className={cl.navbar_header}>MERN CLOUD</div>
        <div className={cl.navbar_login}>
          <NavLink to="/login">Enter</NavLink>
        </div>
        <div className={cl.navbar_registration}>
          <NavLink to="/registration">Registration</NavLink>
        </div>
      </div>
    </div>
  );
};
