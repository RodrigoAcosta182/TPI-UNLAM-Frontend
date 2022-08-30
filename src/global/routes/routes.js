import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router";
import { GlobalProvider } from "../context/Provider";
import listRoutesGlobal from "./listRoutes";

const RouterApp = () => {
  // const CreateArqContainer = lazy( () => import("../../_+_Main"));

  useEffect(() => {
    fetch("./config.json")
      .then((response) => {
        return response.json();
      })
      .then((jsondata) => {
        localStorage.setItem("config", JSON.stringify(jsondata));
      });
  }, []);

  return (
    <GlobalProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            {listRoutesGlobal.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  component={route.component}
                  key={index}
                />
              );
            })}
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </GlobalProvider>
  );
};

export default RouterApp;