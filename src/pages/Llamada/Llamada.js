import CreaLlamada from "../../components/genericos/VideoLlamada/CreaLlamada";
import IngresoLlamada from "../../components/genericos/VideoLlamada/IngresoLlamada";
import VideoLlamada from "../../components/genericos/VideoLlamada/VideoLlamada";
import "./Llamada.css"
const Llamada = () => {
    return ( <div className="llamada-container">
        {/* <VideoLlamada/> */}
        <CreaLlamada/>
        <IngresoLlamada/>
    </div> );
}
 
export default Llamada;