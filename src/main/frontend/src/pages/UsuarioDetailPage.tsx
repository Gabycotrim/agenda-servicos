
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import Botao from "../components/Botao";

function UsuarioDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const resposta = await api.get<Usuario>(`/usuarios/${id}`);
                setUsuario(resposta.data);
            } catch {
                setErro("Não foi possível carregar os dados do usuário.");
            } finally {
                setCarregando(false);
            }
        }

        if (id) {
            carregarUsuario();
        } else {
            setErro("Identificador do usuário não informado.");
            setCarregando(false);
        }
    }, [id]);

    if (carregando) {
        return (
            <div className="rounded-lg bg-white p-6 text-center text-gray-600 shadow-sm">
                Carregando dados do usuário...
            </div>
        );
    }

    if (erro || !usuario) {
        return (
            <div className="space-y-4 rounded-lg border border-red-200 bg-red-50 p-6">
                <h1 className="text-xl font-bold text-red-800">
                    Não foi possível exibir o usuário
                </h1>

                <p className="text-sm text-red-700">
                    {erro || "Usuário não encontrado."}
                </p>

                <Botao onClick={() => navigate("/usuarios")}>
                    Voltar para usuários
                </Botao>
            </div>
        );
    }

    const campos = [
        { rotulo: "ID", valor: usuario.id },
        { rotulo: "Nome completo", valor: usuario.nome },
        { rotulo: "Nome de usuário", valor: usuario.username },
        { rotulo: "E-mail", valor: usuario.email },
    ];

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-800">
                    Detalhes do usuário
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Consulte as informações cadastradas.
                </p>
            </header>

            <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
                    <h2 className="font-semibold text-gray-800">
                        Informações pessoais
                    </h2>
                </div>

                <dl className="divide-y divide-gray-200 px-5">
                    {campos.map((campo) => (
                        <div
                            key={campo.rotulo}
                            className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-3 sm:gap-4"
                        >
                            <dt className="text-sm font-medium text-gray-500">
                                {campo.rotulo}
                            </dt>
                            <dd className="break-words text-sm text-gray-900 sm:col-span-2">
                                {campo.valor}
                            </dd>
                        </div>
                    ))}
                </dl>
            </section>

            <Botao
                variante="neutro"
                onClick={() => navigate("/usuarios")}
            >
                Voltar para usuários
            </Botao>
        </div>
    );
}

export default UsuarioDetailPage;
