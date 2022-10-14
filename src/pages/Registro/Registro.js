import React, { useContext, useEffect } from "react";
import RegistroBox from "../../components/auth/RegistroBox/RegistroBox";
import Loading from "../../components/genericos/Loading/Loading";
import { resetListError } from "../../context/action/listError/listError";
import { GlobalContext } from "../../context/Provider";
import "./Registro.css";

const Registro = () => {
  const { listErrorDispatch, registroState } = useContext(GlobalContext);

  useEffect(() => {
    resetListError()(listErrorDispatch);
  }, []);

  return (
    <>
      <Loading state={registroState.registro.loading} mensaje={"Registrando usuario"} />
      <div className="registro-container">
        <RegistroBox></RegistroBox>
      </div>
    </>
  );
};

export default Registro;
