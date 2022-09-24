import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalProvider from "../context/Provider";
import GlobalInitializeData from "../global/GlobalInitializeData";
import routes from "./listRoutes";

const RouterMain = () => {
  return (
    <GlobalProvider>
      <GlobalInitializeData>
        <Router>
          <Switch>
            {routes.map((route, key) => {
              return (
                <Route
                  exact
                  path={route.path}
                  key={key}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </Router>
      </GlobalInitializeData>
    </GlobalProvider>
  );
};

export default RouterMain;
