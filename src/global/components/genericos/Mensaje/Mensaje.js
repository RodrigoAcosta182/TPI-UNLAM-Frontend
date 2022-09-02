import "./Mensaje.css";

const Mensaje = ({titulo, textoNegrita, texto, dissmiss, danger}) => {
  return (
    <>     
      {(texto || textoNegrita) && <div className="ptur-modalBody-mensaje">
        {textoNegrita && <h3 className="bw16m c-latex10">{textoNegrita === "" ? "Error inesperado." : textoNegrita}</h3>}        
        {texto && <h3 className="bw16t c-latex10">{texto === "" ? "" : texto}</h3>}
      </div>}
   </>
  );
};

export default Mensaje;
