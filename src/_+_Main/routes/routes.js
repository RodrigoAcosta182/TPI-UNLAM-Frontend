import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route, Switch } from "react-router";
import { GlobalProviderMain } from "../context/provider";
import GlobalInitializeData from "../GlobalInitializeData";
import PaginaNoEncontrada from "../pages/PaginaNoEncontrada/PaginaNoEncontrada";
import listRoutesMain from "./listRoutes";

const RouterMain = ({ match }) => {
  let path = window.location.pathname

  return (
    <GlobalProviderMain>
      <GlobalInitializeData>
        <IonPage>
          <IonRouterOutlet>
            <Switch>
              {listRoutesMain.map((route, index) => {
                if (
                  route.path.toLocaleLowerCase() ===
                  path.toLocaleLowerCase()
                ) {
                  document.title = route.title;
                }
                return (
                  <Route
                    path={route.path}
                    component={route.component}
                    key={index}
                    exact
                  />
                );
              })}

              <Route path="/" component={PaginaNoEncontrada} />
            </Switch>
          </IonRouterOutlet>
        </IonPage>
      </GlobalInitializeData>
    </GlobalProviderMain>
  );
};

export default RouterMain;
