import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { salvarSessao } from "../services/auth";
import type { Sessao } from "../services/auth";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErro("");
        setCarregando(true);

        try {
            const resposta = await api.post<Sessao>("/login", {
                username,
                senha
            });

            salvarSessao(resposta.data);
            navigate("/", { replace: true });

        } catch {
            setErro("Usuário ou senha inválidos.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-5 rounded-xl bg-white p-8 shadow-lg"
            >
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-blue-800">
                        Agenda de Serviços
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Entre com suas credenciais para acessar o sistema.
                    </p>
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Nome de usuário
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Digite seu usuário"
                        autoComplete="username"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="senha"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Senha
                    </label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Digite sua senha"
                        autoComplete="current-password"
                        required
                    />
                </div>

                {erro && (
                    <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                        {erro}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={carregando}
                    className="w-full rounded-md bg-blue-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {carregando ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;