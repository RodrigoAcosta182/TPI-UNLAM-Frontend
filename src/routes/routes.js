import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "../context/Provider";
import GlobalInitializeData from "../global/GlobalInitializeData";
import listRoutes from "./listRoutes";

const RouterApp = () => {
  //   useEffect(() => {
  //     fetch("./config.json")
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((jsondata) => {
  //         localStorage.setItem("config", JSON.stringify(jsondata));
  //       });
  //   }, []);

  return (
    <GlobalProvider>
      <GlobalInitializeData>
        <BrowserRouter>
          <Routes>
            {listRoutes.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  element={route.component()}
                  key={index}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </GlobalInitializeData>
    </GlobalProvider>
  );
};

export default RouterApp;
