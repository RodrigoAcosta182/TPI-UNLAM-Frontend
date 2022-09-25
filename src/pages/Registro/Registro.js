import React, { useContext, useEffect } from "react";
import RegistroBox from "../../components/auth/RegistroBox/RegistroBox";
import { resetListError } from "../../context/action/listError/listError";
import { GlobalContext } from "../../context/Provider";
import "./Registro.css";

const Registro = () => {
  const { listErrorDispatch } = useContext(GlobalContext);

  useEffect(()=>{
    resetListError()(listErrorDispatch)
  },[])

  return (
    <div className="registro-container">
      <RegistroBox></RegistroBox>
    </div>
  );
};

export default Registro;
