import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./HomePaciente.css";
import JuegoSeleccionado from "../../../components/juego/JuegoSeleccionado/CardJuegos/JuegoSeleccionado";
import CardJuegos from "../../../components/juego/CardJuegos/CardJuegos";
import { hideModal, showModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";
import ReactTooltip from "react-tooltip";
import ModalMensaje from "../../../components/genericos/ModalMensaje/ModalMensaje";
import AyudaIcon from "../../../assets/images/AyudaIcon";

const HomePaciente = () => {
  const { authState, listaJuegosState, modalDispatch, textosState } =
    useContext(GlobalContext);

  const history = useHistory();

  const irAlJuego = (e) => {
    history.push(e.ruta);
    cerrarModal();
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  const showModalJuego = (item) => {
    // setJuegoSeleccionado(item);
    showModal(
      <JuegoSeleccionado
        juego={item.descripcion}
        activo={item.activo}
        irAlJuego={() => irAlJuego(item)}
        cerrar={() => cerrarModal()}
        imagen={item.id}
      />,
      "",
      cerrarModal,
      true,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const modalAyuda = () => {
    showModal(
      <ModalMensaje
        titulo={"Información"}
        mensaje={textosState.textos.data[1].mensaje}
      />,
      "",
      cerrarModal,
      true,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  return (
    <React.Fragment>
      <button
        className="home-ayudaBtn bw14b"
        onClick={() => modalAyuda()}
        data-tip
        data-for={`botonTooltipAyuda`}
      >
        <AyudaIcon color={"white"} />
        <ReactTooltip
          id={`botonTooltipAyuda`}
          place="top"
          type="light"
          effect="solid"
          border={true}
        >
          Mas información
        </ReactTooltip>
      </button>
      <div className="home-container">
        <div className="home-logoBienvenida">
          <p className="c-white bw32t">
            Hola{" "}
            <span className="bw32b">{authState.auth.data.usuario.nombre}</span>,
            elegí un juego:
          </p>
        </div>
        <div className="home-listaJuegos">
          {Array.isArray(listaJuegosState.listaJuegos.data) &&
            listaJuegosState.listaJuegos.data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="home-cardJuegos">
                    <CardJuegos
                      juego={item.descripcion}
                      activo={item.activo}
                      irAlJuego={() => showModalJuego(item)}
                      imagen={item.id}
                    />
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePaciente;
