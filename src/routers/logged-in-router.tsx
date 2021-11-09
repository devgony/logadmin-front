import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import Dashboard from "../pages/dashboard";
import LinkManager from "../pages/link-manager";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <div className="h-95vh">
        <Switch>
          <Route path="/" exact>
            <LinkManager />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
