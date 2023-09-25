import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvicer} from "./context/ContextProvider.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/custom.scss';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContextProvicer>
            <RouterProvider router={router}/>
        </ContextProvicer>
    </React.StrictMode>,
)
