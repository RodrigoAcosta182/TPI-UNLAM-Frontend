import "./CardInfoPaciente.css";

const CardInfoPaciente = () => {
  return (
    <div className="cardInfoPaciente-container">
      <div className="cardInfoPaciente-column">
        <span className="bw18m">
          {" "}
          <span className="bw18b">Nombre: </span>Luis Diaz{" "}
        </span>
        <span className="bw18m">
          {" "}
          <span className="bw18b">Dni: </span>12354687{" "}
        </span>
      </div>
      <div className="cardInfoPaciente-column">
        <span className="bw18m">
          {" "}
          <span className="bw18b">Tutor a cargo: </span>Ramon Valdez{" "}
        </span>
        <span className="bw18m">
          {" "}
          <span className="bw18b">Dni: </span>12354687{" "}
        </span>
      </div>

      <span></span>
    </div>
  );
};

export default CardInfoPaciente;
