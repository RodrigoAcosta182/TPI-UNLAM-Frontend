import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const listRoutes = [
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
