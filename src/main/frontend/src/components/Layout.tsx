import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { sair, temPapel, obterUsuario } from "../services/auth";

function Layout() {
    const navigate = useNavigate();

    const administrador = temPapel("Administrador");
    const atendente = temPapel("Atendente");
    const usuario = obterUsuario();

    const links = [
        { to: "/", label: "Início", end: true },
        ...(administrador
            ? [
                { to: "/usuarios", label: "Usuários" },
                { to: "/permissoes", label: "Permissões" },
            ]
            : []),
        { to: "/servicos", label: "Serviços" },
        { to: "/clientes", label: "Clientes" },
        ...(administrador
            ? [{ to: "/atribuir-permissoes", label: "Atribuir Permissões" }]
            : []),
    ];

    function handleSair() {
        sair();
        navigate("/login", { replace: true });
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-blue-800 text-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Agenda de Serviços
                            </h1>

                            <p className="mt-1 text-sm text-blue-100">
                                Olá, {usuario?.nome}
                                {administrador ? " (Administrador)" : atendente ? " (Atendente)" : " (Sem permissão)"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSair}
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                        >
                            Sair
                        </button>
                    </div>

                    <nav className="flex flex-wrap gap-2">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.end}
                                className={({ isActive }) =>
                                    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-white text-blue-800"
                                            : "text-white hover:bg-blue-700"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;