import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import PaginaNoEncontrada from "../pages/PaginaNoEncontrada/PaginaNoEncontrada";

const listRoutesMain = [
  {
    path: "/",
    component: Login,
    auth: false,
    title: "Login",
  },
  {
    path: "/home",
    component: Home,
    auth: false,
    title: "Home",
  },
  {
    path: "/404",
    component: PaginaNoEncontrada,
    auth: false,
    title: "Página no Encontrada",
  },
];

export default listRoutesMain;
