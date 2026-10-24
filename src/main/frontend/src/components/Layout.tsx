
import { Link, Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav>
                <Link to="/">Início</Link> {" | "}
                <Link to="/usuarios">Usuários</Link> {" | "}
                <Link to="/permissoes">Permissões</Link> {" | "}
                <Link to="/servicos">Serviços</Link> {" | "}
                <Link to="/atribuir-permissoes">Atribuir Permissões</Link>
            </nav>

            <hr />

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
