
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import UsuariosPage from "./pages/UsuariosPage";
import PermissoesPage from "./pages/PermissoesPage";
import ServicosPage from "./pages/ServicosPage";
import UsuarioPermissoesPage from "./pages/UsuarioPermissoesPage";
import UsuarioDetailPage from "./pages/UsuarioDetailPage";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="usuarios" element={<UsuariosPage />} />
                <Route path="usuarios/:id" element={<UsuarioDetailPage />} />
                <Route path="permissoes" element={<PermissoesPage />} />
                <Route path="servicos" element={<ServicosPage />} />
                <Route
                    path="atribuir-permissoes"
                    element={<UsuarioPermissoesPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
