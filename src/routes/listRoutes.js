import Home from "../pages/Home/Home";
import ColorCorrecto from "../pages/Juegos/ColorCorrecto/ColorCorrecto";
import ComidaCorrecta from "../pages/Juegos/ComidaCorrecta/ComidaCorrecta";
import OrdenaNumeros from "../pages/Juegos/OrdenaNumeros/OrdenaNumeros";
import VerdaderoFalso from "../pages/Juegos/VerdaderoFalso/VerdaderoFalso";
import ListaProfesionales from "../pages/ListaProfesionales/ListaProfesionales";
import Llamada from "../pages/Llamada/Llamada";
import Login from "../pages/Login/Login";
import MisPacientes from "../pages/MisPacientes/MisPacientes";
import Perfil from "../pages/Perfil/Perfil";
import Registro from "../pages/Registro/Registro";
import Resultados from "../pages/Resultados/Resultados";

const listRoutes = [
  {
    path: "/llamada",
    component: Llamada,
    title: "Llamada Test",
    auth: false,
  },
  {
    path: "/colorcorrecto",
    component: ColorCorrecto,
    title: "Color Correcto",
    auth: false,
  },
  {
    path: "/ordenanumeros",
    component: OrdenaNumeros,
    title: "Ordena Numeros",
    auth: false,
  },
  {
    path: "/verdaderofalso",
    component: VerdaderoFalso,
    title: "Verdadero o Falso",
    auth: false,
  },
  {
    path: "/comidacorrecta",
    component: ComidaCorrecta,
    title: "Comida Correcta",
    auth: false,
  },
  {
    path: "/registrarse",
    component: Registro,
    title: "Registrarse",
    auth: false,
  },
  {
    path: "/listaProfesionales",
    component: ListaProfesionales,
    title: "Lista Profesionales",
    auth: false,
  },
  {
    path: "/misPacientes",
    component: MisPacientes,
    title: "Mis Pacientes",
    auth: false,
  },
  {
    path: "/resultados",
    component: Resultados,
    title: "Resultados",
    auth: false,
  },
  {
    path: "/perfil",
    component: Perfil,
    title: "Mi Perfil",
    auth: false,
  },
  {
    path: "/home",
    component: Home,
    title: "Home",
    auth: false,
  },
  {
    path: "/",
    component: Login,
    title: "Login",
    auth: false,
  },
];

export default listRoutes;
