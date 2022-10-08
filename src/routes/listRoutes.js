import Home from "../pages/Home/Home";
import HomeProfesionales from "../pages/HomeProfesionales/HomeProfesionales";
import ColorCorrecto from "../pages/Juegos/ColorCorrecto/ColorCorrecto";
import OrdenaNumeros from "../pages/Juegos/OrdenaNumeros/OrdenaNumeros";
import Login from "../pages/Login/Login";
import MisPacientes from "../pages/MisPacientes/MisPacientes";
import Perfil from "../pages/Perfil/Perfil";
import Registro from "../pages/Registro/Registro";
import Resultados from "../pages/Resultados/Resultados";

const listRoutes = [
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
    path: "/registrarse",
    component: Registro,
    title: "Registrarse",
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
    path: "/homeProf",
    component: HomeProfesionales,
    title: "Home Profesional",
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
