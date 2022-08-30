import { useState, useEffect, useContext } from "react";
import "./Toaster.css";
import { hideToaster } from "../../../context/action/toaster/toaster";
import { GlobalContext } from "../../../context/Provider";
import ToasterSuccess from "../../../assets/generico/ToasterSuccess";
import ToasterDanger from "../../../assets/generico/ToasterDanger";

const Toaster = () => {
  const { toasterState, toasterDispatch } = useContext(GlobalContext);
  const [animation, setAnimation] = useState("");
  const [params, setParams] = useState("");
  const [posicion, setPosicion] = useState(["ptur-toaster-centrar"]);
  const [tipo, setTipo] = useState("");
  const [tipoIcon, setTipoIcon] = useState(null);

  useEffect(() => {
    if (toasterState.toaster.data !== undefined) {
      if (
        toasterState.toaster.data.posicion !== undefined &&
        toasterState.toaster.data.posicion !== null &&
        toasterState.toaster.data.posicion !== ""
      ) {
        setPosicion("ptur-toaster-centrar");
      }
      setAnimation("ptur-toaster-desplazarCentroArriba");
      setParams(toasterState.toaster.data.params);

      switch (toasterState.toaster.data.params.tipo) {
        case "info":
          setTipo("bgc-latex30");
          break;
        case "success":
          setTipo("bgc-broccoli");
          setTipoIcon(true);
          break;
        case "danger":
          setTipo("bgc-danger");
          setTipoIcon(false);
          break;
        default:
          setTipo("bgc-danger");
      }
      setTimeout(() => {
        hideToaster()(toasterDispatch);
      }, 3500);
    }
  }, [toasterState.toaster.data]);

  return (
    <div className={`ptur-toaster ${tipo} ${animation} ${posicion}`}>
      <div className="ptur-toaster-content">
        {tipoIcon ? <ToasterSuccess /> : <ToasterDanger />}
        <span className="rb16m ptur-toaster-texto">{params.texto}</span>
      </div>
    </div>
  );
};

export default Toaster;
