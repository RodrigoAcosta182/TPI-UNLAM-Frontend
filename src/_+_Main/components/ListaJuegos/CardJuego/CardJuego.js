import { ContainerCardJuego, TitleCardJuego } from "./localStyle";

const CardJuego = ({ juego }) => {
  return (
    <ContainerCardJuego>
      <TitleCardJuego>
        <span className="bw18l">{juego.descripcion}</span>
      </TitleCardJuego>
    </ContainerCardJuego>
  );
};

export default CardJuego;
