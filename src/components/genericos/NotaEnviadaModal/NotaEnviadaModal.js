import "./NotaEnviadaModal.css"
import logoGrandin from "../../../assets/images/empresa/LogoGrandinLandingPage.png"
const NotaEnviadaModal = ({cerrarModal}) => {
  return <div className="sugerenciaSaludo-container">
    <img src={logoGrandin} alt="" className="sugerenciaSaludo-logoGrandin" />
    <h2>La nota fue enviada correctamente</h2>
    <div className="btn bgc-latex30 pointer c-white bw18b" onClick={cerrarModal}>Aceptar</div>
  </div>;
};

export default NotaEnviadaModal;
