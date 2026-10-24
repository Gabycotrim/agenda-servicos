
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
    const links = [
        { to: "/", label: "Início", end: true },
        { to: "/usuarios", label: "Usuários" },
        { to: "/permissoes", label: "Permissões" },
        { to: "/servicos", label: "Serviços" },
        { to: "/atribuir-permissoes", label: "Atribuir Permissões" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">
            <header className="bg-blue-800 text-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                    <h1 className="mb-4 text-2xl font-bold">
                        Agenda de Serviços
                    </h1>

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
