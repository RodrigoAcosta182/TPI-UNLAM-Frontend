import LlamadaPaciente from "../components/genericos/VideoLlamada/LlamadaPaciente";

const GlobalInitializeData = ({ children }) => {
  return (
    <div>
      {children}
      <LlamadaPaciente />
    </div>
  );
};

export default GlobalInitializeData;
