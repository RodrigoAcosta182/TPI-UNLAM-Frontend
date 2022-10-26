import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LlamadaPaciente from "../components/genericos/VideoLlamada/LlamadaPaciente";
import GlobalProvider from "../context/Provider";
import GlobalInitializeData from "../global/GlobalInitializeData";
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
