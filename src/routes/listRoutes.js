import Home from "../pages/Home/Home";
import ColorCorrecto from "../pages/Juegos/ColorCorrecto/ColorCorrecto";
import ComidaCorrecta from "../pages/Juegos/ComidaCorrecta/ComidaCorrecta";
import OrdenaNumeros from "../pages/Juegos/OrdenaNumeros/OrdenaNumeros";
import SeguirPatron from "../pages/Juegos/SeguirPatron/SeguirPatron";
import VerdaderoFalso from "../pages/Juegos/VerdaderoFalso/VerdaderoFalso";
import Landing from "../pages/Landing/Landing";
import ListaProfesionales from "../pages/ListaProfesionales/ListaProfesionales";
import Login from "../pages/Login/Login";
import MisPacientes from "../pages/MisPacientes/MisPacientes";
import Notas from "../pages/Notas/Notas";
import NotasArchivadas from "../pages/NotasArchivadas/NotasArchivadas";
import NotasPaciente from "../pages/NotasPaciente/NotasPaciente";
import Perfil from "../pages/Perfil/Perfil";
import Registro from "../pages/Registro/Registro";
import Resultados from "../pages/Resultados/Resultados";
import ResultadosCards from "../pages/ResultadosCards/ResultadosCards";
import Sugerencia from "../pages/Sugerencia/Sugerencia";

const listRoutes = [
  {
    path: "/sugerencia",
    component: Sugerencia,
    title: "Sugerencia",
    auth: false,
  },
  {
    path: "/landing",
    component: Landing,
    title: "Landing",
    auth: false,
  },
  {
    path: "/colorcorrecto",
    component: ColorCorrecto,
    title: "Color Correcto",
    auth: true,
  },
  {
    path: "/ordenanumeros",
    component: OrdenaNumeros,
    title: "Ordena Numeros",
    auth: true,
  },
  {
    path: "/seguirpatrones",
    component: SeguirPatron,
    title: "Seguir Patron",
    auth: true,
  },
  {
    path: "/verdaderofalso",
    component: VerdaderoFalso,
    title: "Verdadero o Falso",
    auth: true,
  },
  {
    path: "/comidacorrecta",
    component: ComidaCorrecta,
    title: "Comida Correcta",
    auth: true,
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
    auth: true,
  },
  {
    path: "/misPacientes",
    component: MisPacientes,
    title: "Mis Pacientes",
    auth: true,
  },
  {
    path: "/notas",
    component: Notas,
    title: "Notas",
    auth: true,
  },
  {
    path: "/notasPaciente",
    component: NotasPaciente,
    title: "Notas Paciente",
    auth: true,
  },
  {
    path: "/notasArchivadas",
    component: NotasArchivadas,
    title: "Notas Archivadas",
    auth: true,
  },
  {
    path: "/resultados",
    component: Resultados,
    title: "Resultados",
    auth: true,
  },
  {
    path: "/resultadosCards",
    component: ResultadosCards,
    title: "Resultados Juegos",
    auth: true,
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
    auth: true,
  },
  {
    path: "/",
    component: Login,
    title: "Login",
    auth: false,
  },
];

export default listRoutes;
