import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {getFiles, searchFiles} from "../../actions/file";
import Logo from "../../assets/img/navbar-logo.svg"
import {showLoader} from "../../reducers/appReducer";
import {logout} from "../../reducers/userReducer";
import cl from "./navbar.module.scss"


export const NavBar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)
  const currentDir = useSelector(state => state.files.currentDir)

  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)


  function searchChangeHandler(e) {
    setSearchName(e.target.value)

    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }
    dispatch(showLoader())

    if(e.target.value !== '') {
      setSearchTimeout(setTimeout((value) => {
        dispatch(searchFiles(value));
      }, 500, e.target.value))
    } else {
      dispatch(getFiles(currentDir))
    }
  }

  return (
    <div className={cl.navbar}>
      <div className={cl.container}>
        <img src={Logo} alt=""/>
        <div className={cl.navbar_header}>MERN CLOUD</div>
        {isAuth &&
        <input
          value={searchName}
          onChange={e => searchChangeHandler(e)}
          className={cl.navbar_search}
          type="text"
          placeholder="File name"
        />}
        {!isAuth && <div className={cl.navbar_login}><NavLink to="/login">Войти</NavLink></div>}
        {!isAuth && <div><NavLink to="/registration">Registration</NavLink></div>}
        {isAuth && <div className={cl.navbar_login} onClick={() => dispatch(logout())}>Exit</div>}
      </div>
    </div>
  );
};