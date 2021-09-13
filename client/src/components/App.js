import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {auth} from "../actions/user";
import {Login} from "./authorization/Login";
import {NavBar} from "./navbar/NavBar";
import "./app.module.scss"
import {Registration} from "./authorization/Registration";

export function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className='app'>
        <NavBar/>
        <div className="wrap">
          {!isAuth &&
          <Switch>
            <Route path="/registration" component={Registration}/>
            <Route path="/login" component={Login}/>
          </Switch>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}
