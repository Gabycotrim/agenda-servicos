import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import UsuariosPage from "./pages/UsuariosPage";
import PermissoesPage from "./pages/PermissoesPage";
import ServicosPage from "./pages/ServicosPage";
import UsuarioPermissoesPage from "./pages/UsuarioPermissoesPage";
import UsuarioDetailPage from "./pages/UsuarioDetailPage";

function App() {
    return (
        <Routes>
            {/* Rota pública */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rotas protegidas */}
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                }
            >
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