import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import CadastroUsuario from "./views/CadastroUsuario.jsx";
import Usuario from "./views/Usuario.jsx";
import Home from "./views/Home.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/home"/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/usuario',
                element: <Usuario/>
            },
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/cadastrousuario',
        element: <CadastroUsuario/>
    },
]);

export default router;
