import { getFecha } from "../../../global/utils/getFecha";
import "./CardInfoPaciente.css";
const CardInfoPaciente = ({ paciente }) => {
  console.log(paciente);
  return (
    <div className="cardInfoPaciente-container">
      <div className="cardInfoPaciente-column">
        <span className="bw18m">
          {" "}
          <span className="bw18b">Paciente: </span>
          {paciente.pacienteNombre + " " + paciente.pacienteApellido}{" "}
        </span>
        <span className="bw18m">
          {" "}
          <span className="bw18b">F. Nacimiento: </span>{getFecha(paciente.fechaNacimiento) }{" "}
        </span>
      </div>
      <div className="cardInfoPaciente-column">
        <span className="bw18m">
          {" "}
          <span className="bw18b">Tutor a cargo: </span>{paciente.nombreTutor}{" "}
        </span>
        {/* <span className="bw18m">
          {" "}
          <span className="bw18b">Dni: </span>12354687{" "}
        </span> */}
      </div>

      <span></span>
    </div>
  );
};

export default CardInfoPaciente;
