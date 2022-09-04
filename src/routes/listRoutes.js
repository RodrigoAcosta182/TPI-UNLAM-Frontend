import Home from "../pages/Home/Home";
import ColorCorrecto from "../pages/Juegos/ColorCorrecto/ColorCorrecto";
import OrdenaNumeros from "../pages/Juegos/OrdenaNumeros/OrdenaNumeros";
import Login from "../pages/Login/Login";
import Registro from "../pages/Registro/Registro";

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
