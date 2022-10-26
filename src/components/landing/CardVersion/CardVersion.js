import "./CardVersion.css";
import tildeOk from "../../../assets/images/TildeOk.png";
const CardVersion = ({ titulo, lista, className }) => {
  return (
    <div className="cardVersion-container">
      <div className={`cardVersion-circulo ${className}`}></div>
      <div className="cardVersion-lista">
        {Array.isArray(lista) &&
          lista.map((item, index) => (
            <div key={index} className="cardVersion-lista-elemento">
              <img
                className="cardVersion-lista-tildeOK"
                src={tildeOk}
                alt="tildeOK"
              />
              <span className="bw18m">{item}</span>
            </div>
          ))}
      </div>
      <span className="bw24b">{titulo}</span>
    </div>
  );
};

export default CardVersion;
