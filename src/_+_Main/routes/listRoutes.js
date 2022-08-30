import Bienvenido from "../pages/Bienvenido/Bienvenido";
import Demo from "../pages/Demo/Demo";
import Login from "../pages/Login/Login";
import PaginaNoEncontrada from "../pages/PaginaNoEncontrada/PaginaNoEncontrada";

const listRoutesMain = [
    {
        path:"/",
        component: Login, 
        auth: false, 
        title: "Login",
    },
    {
        path:"/inicio",
        component: Bienvenido, 
        auth: false, 
        title: "Bienvenido", 
    },
    {
        path:"/demo",
        component: Demo, 
        auth: false, 
        title: "Comenzar proyecto demo", 
    },
    {
        path:"/404",
        component: PaginaNoEncontrada, 
        auth: false, 
        title: "Página no Encontrada", 
    },
    
]; 


export default listRoutesMain; 