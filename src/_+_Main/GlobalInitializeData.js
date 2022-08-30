import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { wsGetTextos } from "../global/context/action/textos/textos";
import { GlobalContext } from "../global/context/Provider";

const GlobalInitializeData = ({ children }) => {
  const history = useHistory();

  // Cambio de contexto
  const { textosState, textosDispatch } = useContext(GlobalContext);

  // Use Effect de textos para evitar que se ejecute muchas veces
  useEffect(() => {
    if (!textosState.textos.data) {
      wsGetTextos()(textosDispatch);
    }
  }, []);

  //   // funcionalidad click "volver" en mobile.
  //   document.addEventListener('ionBackButton', (ev) => {
  //     ev.detail.register(1, () => {
  //       const url = window.location.pathname;
  //       if(url === "/consultamedica" || url === "/" ){
  //         const exit = window.confirm("Desea salir de la App ?");
  //         if(exit){
  //           App.exitApp();
  //         }
  //       }else {
  //         history.push("/consultamedica");
  //       }

  //     });
  //   });

  return <div>{children}</div>;
};

export default GlobalInitializeData;
