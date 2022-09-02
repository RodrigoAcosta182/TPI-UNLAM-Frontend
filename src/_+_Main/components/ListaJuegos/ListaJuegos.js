import CardJuego from "./CardJuego/CardJuego";
import { ContainerListaJuegos } from "./localStyle";


const ListaJuegos = () => {
  const listaDeJuegos = [
    { id: 1, descripcion: "Rompecabezas", ruta: "/rompecabezas", imagen: "" },
    { id: 2, descripcion: "Elegir color", ruta: "/color", imagen: "" },
    { id: 3, descripcion: "Reconocer letras", ruta: "/letras", imagen: "" },
    { id: 4, descripcion: "Reconocer numeros", ruta: "/numeros", imagen: "" },
    { id: 5, descripcion: "Reconocer animales", ruta: "/animales", imagen: "" },
    { id: 6, descripcion: "Reconocer animales", ruta: "/animales", imagen: "" },
    { id: 7, descripcion: "Reconocer animales", ruta: "/animales", imagen: "" },
    { id: 8, descripcion: "Reconocer animales", ruta: "/animales", imagen: "" },
  ];
  return (
    <ContainerListaJuegos>
      {listaDeJuegos.map((item, index) => {
        return <CardJuego key={index} juego={item} />;
      })}
    </ContainerListaJuegos>
  );
};

export default ListaJuegos;
