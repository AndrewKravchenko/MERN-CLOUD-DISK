import {BrowserRouter, Route, Switch} from "react-router-dom";
import {NavBar} from "./navbar/NavBar";
import "./app.module.scss"
import {Registration} from "./registration/Rgistration";

export function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar/>
        <Switch>
          <Route path="/registration" component={Registration}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
