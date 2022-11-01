import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import GlobalProvider from "../context/Provider";
import GlobalInitializeData from "../global/GlobalInitializeData";
import isAuthenticated from "../global/utils/isAuthenticated";
import routes from "./listRoutes";

const RouterMain = () => {
  let path = window.location.pathname;
  return (
    <GlobalProvider>
      <GlobalInitializeData>
        <Router>
          <Switch>
            {routes.map((route, key) => {
              // revisar porque no cambia el nombre de la page, solo apretando F5
              if (route.path.toLocaleLowerCase() === path.toLocaleLowerCase()) {
                document.title = route.title;
              }
              return (
                <Route
                  path={route.path}
                  key={key}
                  render={(props) =>
                    route.auth && !isAuthenticated() && path !== "/" ? (
                      <Redirect to="/" />
                    ) : (
                      <route.component {...props} />
                    )
                  }
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
