
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import type { Permissao } from "../types/Permissao";
import Botao from "../components/Botao";

function UsuarioPermissoesPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);
    const [usuarioId, setUsuarioId] = useState("");
    const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<number[]>([]);
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        api.get<Usuario[]>("/usuarios")
            .then((response) => setUsuarios(response.data))
            .catch(() => setMensagem("Erro ao carregar usuários."));

        api.get<Permissao[]>("/permissoes")
            .then((response) => setPermissoes(response.data))
            .catch(() => setMensagem("Erro ao carregar permissões."));
    }, []);

    useEffect(() => {
        if (!usuarioId) {
            setPermissoesSelecionadas([]);
            return;
        }

        api.get<Usuario>(`/usuarios/${usuarioId}/permissoes`)
            .then((response) => {
                setPermissoesSelecionadas(
                    (response.data.permissoes ?? []).map((permissao) => permissao.id)
                );
            })
            .catch(() => setMensagem("Erro ao carregar as permissões do usuário."));
    }, [usuarioId]);

    function alternarPermissao(id: number) {
        setPermissoesSelecionadas((atuais) =>
            atuais.includes(id)
                ? atuais.filter((permissaoId) => permissaoId !== id)
                : [...atuais, id]
        );
    }

    async function salvarPermissoes() {
        if (!usuarioId) {
            setMensagem("Selecione um usuário.");
            return;
        }

        try {
            await api.put(
                `/usuarios/${usuarioId}/permissoes`,
                permissoesSelecionadas
            );
            setMensagem("Permissões salvas com sucesso!");
        } catch {
            setMensagem("Erro ao salvar as permissões.");
        }
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-800">
                    Atribuir Permissões a Usuários
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Selecione um usuário e defina as permissões que ele poderá utilizar.
                </p>
            </header>

            <section className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="space-y-2">
                    <label
                        htmlFor="usuario"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Selecione o usuário:
                    </label>

                    <select
                        id="usuario"
                        value={usuarioId}
                        onChange={(event) => {
                            setUsuarioId(event.target.value);
                            setMensagem("");
                        }}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">Selecione...</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>

                {usuarioId && (
                    <div className="space-y-4 border-t border-gray-200 pt-5">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Permissões disponíveis
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Marque as permissões que deseja atribuir ao usuário.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {permissoes.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    Nenhuma permissão disponível.
                                </p>
                            ) : (
                                permissoes.map((permissao) => (
                                    <label
                                        key={permissao.id}
                                        className="flex cursor-pointer items-start gap-3 rounded-md border border-gray-200 p-3 hover:bg-gray-50"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={permissoesSelecionadas.includes(permissao.id)}
                                            onChange={() => alternarPermissao(permissao.id)}
                                            className="mt-1 h-4 w-4 accent-blue-600"
                                        />

                                        <span>
                                            <span className="block font-medium text-gray-800">
                                                {permissao.nome}
                                            </span>
                                            <span className="mt-1 block text-sm text-gray-600">
                                                {permissao.descricao}
                                            </span>
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>

                        <Botao type="button" onClick={salvarPermissoes}>
                            Salvar permissões
                        </Botao>
                    </div>
                )}

                {mensagem && (
                    <p
                        role="status"
                        className={`rounded-md p-3 text-sm ${
                            mensagem.includes("sucesso")
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {mensagem}
                    </p>
                )}
            </section>
        </div>
    );
}

export default UsuarioPermissoesPage;
