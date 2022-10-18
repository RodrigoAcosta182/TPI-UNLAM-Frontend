
import LlamadaPaciente from "../../components/genericos/VideoLlamada/LlamadaPaciente";
import LlamadaProfesional from "../../components/genericos/VideoLlamada/LlamadaProfesional";
import "./Llamada.css";
const Llamada = () => {
  return (
    <div className="llamada-container">
      {/* <VideoLlamada/> */}
        <LlamadaProfesional/>
        <LlamadaPaciente/>
    </div>
  );
};

export default Llamada;
