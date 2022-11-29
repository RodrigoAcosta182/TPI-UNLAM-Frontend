import * as React from "react";
import "./MisPacientes.css";
import SalirIcon from "../../assets/images/SalirIcon";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import HeaderbarHome from "../../components/genericos/HeaderbarHome/HeaderbarHome";
import { GlobalContext } from "../../context/Provider";
import {
  resetHabilitacionPaciente,
  wsGetListaDePacientes,
  wsHabilitarPaciente,
} from "../../context/action/misPacientes/misPacientes";
import { setPacienteContexto } from "../../context/action/pacienteSeleccionado/pacienteSeleccionado";
import LlamadaProfesional from "../../components/genericos/VideoLlamada/LlamadaProfesional";
import Modal from "../../components/genericos/Modal/Modal";
import calculaEdad from "../../global/utils/edad";
import ResultadosIcon from "../../assets/images/ResultadosIcon.png";
import ActiveIcon from "../../assets/images/ActiveIcon.png";
import InactiveIcon from "../../assets/images/InactiveIcon.png";
import PostItIcon from "../../assets/images/PostItIcon.png";
import AyudaIcon from "../../assets/images/AyudaIcon";
import ReactTooltip from "react-tooltip";
import useTable from "../../global/utils/useTable";
import TableFooter from "../../components/genericos/TableFooter/TableFooter";
import { hideModal, showModal } from "../../context/action/modal/modal";
import ModalHabilitar from "../../components/genericos/ModalHabilitar/ModalHabilitar";
import ModalMensaje from "../../components/genericos/ModalMensaje/ModalMensaje";
import Dropdown from "../../components/genericos/Dropdown/Dropdown";
import {
  findAndUpdate,
  obtenerIndexArray,
  obtenerPacienteDeLaLista,
} from "../../global/utils/obtenerIndexArray";

const MisPacientes = () => {
  const {
    misPacientesState,
    misPacientesDispatch,
    pacienteSeleccionadoDispatch,
    modalState,
    modalDispatch,
    textosState,
    estadoConexionState,
  } = React.useContext(GlobalContext);
  const [habilitarPacienteDto, setHabilitarPacienteDto] = React.useState({
    id: null,
    estado: null,
  });

  const history = useHistory();

  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState(null);

  let arrayEstados = [
    {
      id: 1,
      estado: "Activos",
    },
    {
      id: 2,
      estado: "Inactivos",
    },
    {
      id: 3,
      estado: "Pendientes",
    },
    {
      id: 4,
      estado: "Todos",
    },
  ];

  const [dropdownFiltros, setDropdownFiltros] = React.useState(
    arrayEstados[arrayEstados.length - 4].id
  );

  const [flgData, setFlgData] = React.useState(true);

  useEffect(() => {
    let arrx = [];
    if (misPacientesState.misPacientes.data && flgData) {
      Array.isArray(misPacientesState.misPacientes.data) &&
        misPacientesState.misPacientes.data.map((item) => {
          if (item.estado === true) {
            return arrx.push(item);
          }
        });
      setData(arrx);
      // setFlgData(false);
    }
  }, [misPacientesState.misPacientes.data, flgData]);

  const { slice, range } = useTable(data ? data : "", page, 4);

  useEffect(() => {
    if (misPacientesState.misPacientes.data === null) {
      wsGetListaDePacientes()(misPacientesDispatch);
    }
  }, []);

  useEffect(() => {
    if (misPacientesState.misPacientes.habilitar === "") {
      wsGetListaDePacientes()(misPacientesDispatch);
      resetHabilitacionPaciente()(misPacientesDispatch);
    }
  }, [misPacientesState.misPacientes.habilitar]);

  const irAMasInfo = (e) => {
    history.push("/resultadosCards");
    setPacienteContexto(e)(pacienteSeleccionadoDispatch);
  };

  const modalConfirmar = (item, opcion) => {
    showModal(
      <ModalHabilitar
        item={item}
        opcion={opcion}
        habilitarPaciente={() => habilitarPaciente(item)}
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
        mensaje={textosState.textos.data[0].mensaje}
      />,
      "",
      cerrarModal,
      true,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const cerrarModal = () => {
    hideModal()(modalDispatch);
  };

  const habilitarPaciente = (e) => {
    cerrarModal();
    setHabilitarPacienteDto({
      ...habilitarPacienteDto,
      id: e.pacienteId,
      estado: e.estado,
    });
  };

  useEffect(() => {
    if (
      (habilitarPacienteDto.pacienteId !== null) &
      (habilitarPacienteDto.estado !== null)
    ) {
      wsHabilitarPaciente(habilitarPacienteDto)(misPacientesDispatch);
      setDropdownFiltros(arrayEstados[arrayEstados.length - 4].id);
    }
  }, [habilitarPacienteDto]);

  const volverAlHome = () => {
    history.push("/home");
  };

  const irANotasDelPaciente = (e) => {
    history.push("/notasPaciente");
    setPacienteContexto(e)(pacienteSeleccionadoDispatch);
  };

  const filtrarEstado = (e) => {
    if (e !== "") {
      switch (e.estado) {
        case "Activos":
          setDropdownFiltros(arrayEstados[arrayEstados.length - 4].id);
          let arrxActivos = [];
          for (let i = 0; i < misPacientesState.misPacientes.data.length; i++) {
            if (misPacientesState.misPacientes.data[i].estado === true) {
              arrxActivos.push(misPacientesState.misPacientes.data[i]);
            }
            setData(arrxActivos);
          }
          break;
        case "Inactivos":
          setDropdownFiltros(arrayEstados[arrayEstados.length - 3].id);
          let arrxInactivos = [];
          for (let i = 0; i < misPacientesState.misPacientes.data.length; i++) {
            if (
              misPacientesState.misPacientes.data[i].estado === false &&
              misPacientesState.misPacientes.data[i].fechaInicioRelac !== null
            ) {
              arrxInactivos.push(misPacientesState.misPacientes.data[i]);
            }
            setData(arrxInactivos);
          }
          break;
        case "Pendientes":
          setDropdownFiltros(arrayEstados[arrayEstados.length - 2].id);
          let arrxPendientes = [];
          for (let i = 0; i < misPacientesState.misPacientes.data.length; i++) {
            if (
              misPacientesState.misPacientes.data[i].fechaInicioRelac === null
            ) {
              arrxPendientes.push(misPacientesState.misPacientes.data[i]);
            }
            setData(arrxPendientes);
          }
          break;
        default:
          setDropdownFiltros(arrayEstados[arrayEstados.length - 1].id);
          setData(misPacientesState.misPacientes.data);
          break;
      }
    }
  };

  //estado online
  useEffect(() => {
    if (data && estadoConexionState.usuarioConectado) {
      findAndUpdate(
        misPacientesState.misPacientes.data,
        "online",
        estadoConexionState.usuarioConectado.usuario.mail,
        true
      );
      findAndUpdate(
        data,
        "online",
        estadoConexionState.usuarioConectado.usuario.mail,
        true
      );
    }
  }, [estadoConexionState.usuarioConectado]);

  return (
    <>
      {modalState.modal.show && <Modal />}
      <HeaderbarHome></HeaderbarHome>
      <div className="misPacientes-volverAccion">
        <div className="misPacientes-btnCont" onClick={volverAlHome}>
          <SalirIcon />
          <p className="misPacientes-volverBtn c-white bw16b">VOLVER</p>
        </div>
      </div>
      <>
        <p className="misPacientes-titulo c-white bw32b">Mis Pacientes:</p>
        <div className="misPacientes-filtro-ayuda">
          <div className="misPacientes-dropdownEstado">
            <p className="c-white bw18b">Filtros:</p>
            <Dropdown
              valor={dropdownFiltros}
              datos={arrayEstados}
              name="estado"
              onChange={filtrarEstado}
              campoCodigo="id"
              descripcion="estado"
              heightLista={"auto"}
              customCss={"widthFiltros"}
              customCssInput={"bw18b"}
            />
          </div>
          <button
            className="misPacientes-ayudaBtn bw14b"
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
        </div>

        <div className="misPacientes-container">
          <div className="bordeTablaPac">
            <table className="containerTabla">
              <tbody>
                <tr className="bw18t c-white">
                  <th className="columnaInicio">En línea</th>
                  <th className="columnaInicio">Nombre</th>
                  <th className="columna">Edad</th>
                  <th className="columna">Fecha Nacimiento</th>
                  <th className="columna">Tutor a cargo</th>
                  <th className="columna">Teléfono</th>
                  <th className="columna">Mail</th>
                  <th className="columna">Fecha Alta</th>
                  <th className="columna">Fecha Baja</th>
                  <th className="columna">Notas</th>
                  <th className="columna">Activo</th>
                  <th className="columnaVacia">Acc</th>
                  <th className="columnaFinal">
                    <p className="alignLeft">iones</p>
                  </th>
                </tr>

                {Array.isArray(slice) &&
                  slice.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <tr className="tablaFilasContainer bw18t">
                          <td className="tablaFilas c-white circulo-pacienteEnLinea-container">
                            <div
                              className={`circulo-pacienteEnLinea ${
                                item.online ? `bgc-broccoli` : `bgc-white`
                              } `}
                            ></div>
                          </td>
                          <td className="tablaFilas c-white">
                            {item.pacienteNombre} {item.pacienteApellido}{" "}
                          </td>
                          <td className="tablaFilas c-white">
                            {calculaEdad(item.fechaNacimiento)}
                          </td>
                          <td className="tablaFilas c-white">
                            {new Date(
                              item.fechaNacimiento
                            ).toLocaleDateString()}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.nombreTutor}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.telefono}
                          </td>
                          <td className="tablaFilas c-white">{item.mail}</td>
                          <td className="tablaFilas c-white">
                            {item.fechaInicioRelac === null
                              ? "-"
                              : new Date(
                                  item.fechaInicioRelac
                                ).toLocaleDateString()}
                          </td>
                          <td className="tablaFilas c-white">
                            {item.fechaFinRelac === null
                              ? "-"
                              : new Date(
                                  item.fechaFinRelac
                                ).toLocaleDateString()}
                          </td>
                          <td className="tablaFilas c-white">
                            <button
                              className="btnAccionesPacientes tablaNotas"
                              onClick={() => irANotasDelPaciente(item)}
                              data-tip
                              data-for={`botonTooltipNotas ${index}`}
                            >
                              <img
                                alt="result"
                                src={PostItIcon}
                                width={30}
                              ></img>
                              <ReactTooltip
                                id={`botonTooltipNotas ${index}`}
                                place="top"
                                type="light"
                                effect="solid"
                                border={true}
                              >
                                Ver Notas
                              </ReactTooltip>
                            </button>
                          </td>
                          {item.estado ? (
                            <td className="tablaFilas c-white">Si</td>
                          ) : (
                            <td className="tablaFilas c-white">No</td>
                          )}

                          <td className="tablaFilas c-white">
                            {item.estado ? (
                              <button
                                className="btnAccionesPacientes bw14b"
                                onClick={() =>
                                  modalConfirmar(item, "deshabilitar")
                                }
                                data-tip
                                data-for={`botonTooltipDes ${index}`}
                              >
                                <img
                                  alt="check"
                                  src={InactiveIcon}
                                  width={30}
                                ></img>
                                <ReactTooltip
                                  id={`botonTooltipDes ${index}`}
                                  place="top"
                                  type="light"
                                  effect="solid"
                                  border={true}
                                >
                                  Deshabilitar Paciente
                                </ReactTooltip>
                              </button>
                            ) : (
                              <button
                                className="btnAccionesPacientes bw14b"
                                onClick={() =>
                                  modalConfirmar(item, "habilitar")
                                }
                                data-tip
                                data-for={`botonTooltipAct ${index}`}
                              >
                                <img
                                  alt="check"
                                  src={ActiveIcon}
                                  width={30}
                                ></img>
                                <ReactTooltip
                                  id={`botonTooltipAct ${index}`}
                                  place="top"
                                  type="light"
                                  effect="solid"
                                  border={true}
                                >
                                  Habilitar Paciente
                                </ReactTooltip>
                              </button>
                            )}
                          </td>

                          <td className="tablaFilas c-white">
                            <div className="btnPacientesBox">
                              {item.estado ? (
                                <>
                                  <button
                                    className="btnAccionesPacientes bw14b"
                                    onClick={() => irAMasInfo(item)}
                                    data-tip
                                    data-for={`botonTooltipRes ${index + 1}`}
                                  >
                                    <img
                                      alt="result"
                                      src={ResultadosIcon}
                                      width={30}
                                    ></img>
                                    <ReactTooltip
                                      id={`botonTooltipRes ${index + 1}`}
                                      place="top"
                                      type="light"
                                      effect="solid"
                                      border={true}
                                    >
                                      Ver Resultados
                                    </ReactTooltip>
                                  </button>
                                  <LlamadaProfesional paciente={item} />
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <TableFooter
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </div>
      </>
    </>
  );
};

export default MisPacientes;
