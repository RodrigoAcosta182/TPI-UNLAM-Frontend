import { useState, useEffect, useContext } from "react";
import "./ToasterGenerico.css";
import { GlobalContext } from "../../../context/Provider";
import ToasterSuccess from "../../../assets/images/ToasterSuccess";
import ToasterDanger from "../../../assets/images/ToasterDanger";
import { hideToaster } from "../../../context/action/toasterGenerico/toasterGenerico";

const ToasterGenerico = () => {
  const { toasterGenericoState, toasterGenericoDispatch } = useContext(GlobalContext);
  const [animation, setAnimation] = useState("");
  const [params, setParams] = useState("");
  const [posicion, setPosicion] = useState(["ptur-toaster-centrar"]);
  const [tipo, setTipo] = useState("");
  const [tipoIcon, setTipoIcon] = useState(null);

  useEffect(() => {
    if (toasterGenericoState.toasterGenerico.data !== undefined) {
      if (
        toasterGenericoState.toasterGenerico.data.posicion !== undefined &&
        toasterGenericoState.toasterGenerico.data.posicion !== null &&
        toasterGenericoState.toasterGenerico.data.posicion !== ""
      ) {
        setPosicion("ptur-toaster-centrar");
      }
      setAnimation("ptur-toaster-desplazarCentroArriba");
      setParams(toasterGenericoState.toasterGenerico.data.params);

      switch (toasterGenericoState.toasterGenerico.data.params.tipo) {
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
        hideToaster()(toasterGenericoDispatch);
      }, 3500);
    }
  }, [toasterGenericoState.toasterGenerico.data]);

  return (
    <div className={`ptur-toaster ${tipo} ${animation} ${posicion}`}>
      <div className="ptur-toaster-content">
        {tipoIcon ? <ToasterSuccess /> : <ToasterDanger />}
        <span className="bw16b ptur-toaster-texto">{params.texto}</span>
      </div>
    </div>
  );
};

export default ToasterGenerico;