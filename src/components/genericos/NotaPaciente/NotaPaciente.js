
import "./NotaPaciente.css";
const NotaPaciente = ({ handleClickGuardarNota, onChangeNota, texto }) => {
  
  return (
    <div className="notaPaciente-container">
      <textarea className="notaPaciente-textarea" value={texto} onChange={onChangeNota}></textarea>
      <button className="llamadaProfesional-btn-btn  c-white bgc-broccoli bw16b" onClick={handleClickGuardarNota}>
        Guardar Nota
      </button>
    </div>
  );
};

export default NotaPaciente;
