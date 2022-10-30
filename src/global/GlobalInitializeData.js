import { useContext } from "react";
import LlamadaPaciente from "../components/genericos/VideoLlamada/LlamadaPaciente";
import { GlobalContext } from "../context/Provider";

const GlobalInitializeData = ({ children }) => {
  const { authState } = useContext(GlobalContext);
  return (
    <div>
      {children}
      {authState.auth.data &&
        authState.auth.data.usuario.tipoUsuarioId !== 2 && <LlamadaPaciente />}
    </div>
  );
};

export default GlobalInitializeData;
