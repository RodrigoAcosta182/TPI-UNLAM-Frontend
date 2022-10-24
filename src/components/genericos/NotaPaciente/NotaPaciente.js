import "./NotaPaciente.css";
const NotaPaciente = () => {
  return (
    <div className="notaPaciente-container">
      <textarea className="notaPaciente-textarea" ></textarea>
      <button className="btnAccionesPacientes  c-white bgc-broccoli bw16b">
        Guardar Nota
      </button>
    </div>
  );
};

export default NotaPaciente;
