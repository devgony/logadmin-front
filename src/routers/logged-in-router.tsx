import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import Home from "../pages/home";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <div className="h-95vh">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
