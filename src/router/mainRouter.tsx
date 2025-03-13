import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "@/views/auth/Login.tsx";
import Home from "@/views/home/Home.tsx";
import Layout from "@/views/layout/Layout.tsx";
import createProposals from "@/views/propuestas/CreateProposals.tsx";
import PropuestasUsuario from "@/views/propuestas/PropuestasUsuario.tsx";

export default function () {
    return(
        <BrowserRouter>
            <Routes>
                {/*Ruta del login sin sidebar*/}
                <Route path="/" Component={Login}/>

                {/*Rutas con sidebar*/}
                <Route element={<Layout/>}>
                    <Route path="/home" Component={Home}/>
                    <Route path="/proposals" Component={createProposals}/>
                    <Route path="/userProposals" Component={PropuestasUsuario}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}