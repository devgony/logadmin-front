import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import Home from "../pages/home";
import Login from "../pages/login";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <div className="h-95vh">
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
