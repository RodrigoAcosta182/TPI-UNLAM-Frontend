import "./LlamadaEntrante.css"
const LlamadaEntranteModal = ({ mensaje }) => {
  return (
    <div className="llamadaEntranteModal-container">
      <span className="bw18b c-black">{mensaje}</span>
    </div>
  );
};

export default LlamadaEntranteModal;
