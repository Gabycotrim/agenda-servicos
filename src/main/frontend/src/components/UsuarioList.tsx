
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";
import UsuarioForm from "./UsuarioForm";
import Botao from "./Botao";

function UsuarioList() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [editando, setEditando] = useState<Usuario | null>(null);

    async function carregarUsuarios() {
        try {
            const resposta = await api.get<Usuario[]>("/usuarios");
            setUsuarios(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar usuários:", erro);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    async function excluir(id: number) {
        const confirmar = window.confirm(
            "Tem certeza de que deseja excluir este usuário?"
        );

        if (!confirmar) return;

        try {
            await api.delete(`/usuarios/${id}`);
            await carregarUsuarios();

            if (editando?.id === id) {
                setEditando(null);
            }
        } catch (erro) {
            console.error("Erro ao excluir usuário:", erro);
            alert("Não foi possível excluir o usuário.");
        }
    }

    function editar(usuario: Usuario) {
        setEditando(usuario);
    }

    function usuarioSalvo() {
        setEditando(null);
        carregarUsuarios();
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Usuários cadastrados
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Consulte e gerencie os usuários do sistema.
                    </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                    {usuarios.length}{" "}
                    {usuarios.length === 1 ? "usuário" : "usuários"}
                </span>
            </header>

            <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    {editando ? "Editar usuário" : "Cadastrar usuário"}
                </h3>

                <UsuarioForm
                    key={editando?.id ?? "novo"}
                    usuarioEditando={editando}
                    onUsuarioSalvo={usuarioSalvo}
                />

                {editando && (
                    <div className="mt-3">
                        <Botao
                            type="button"
                            variante="neutro"
                            onClick={() => setEditando(null)}
                        >
                            Cancelar edição
                        </Botao>
                    </div>
                )}
            </section>

            <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Lista de usuários
                    </h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-600">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Nome</th>
                                <th className="px-4 py-3 font-semibold">Usuário</th>
                                <th className="px-4 py-3 font-semibold">E-mail</th>
                                <th className="px-4 py-3 font-semibold">Ações</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {usuarios.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-4 py-8 text-center text-gray-500"
                                    >
                                        Nenhum usuário cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                usuarios.map((usuario) => (
                                    <tr
                                        key={usuario.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            <UsuarioItem usuario={usuario} />
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {usuario.username}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {usuario.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    to={`/usuarios/${usuario.id}`}
                                                    className="inline-flex rounded-md bg-blue-100 px-3 py-2 text-xs font-medium text-blue-800 hover:bg-blue-200"
                                                >
                                                    Ver detalhes
                                                </Link>

                                                <Botao
                                                    type="button"
                                                    onClick={() => editar(usuario)}
                                                    className="px-3 py-2 text-xs"
                                                >
                                                    Editar
                                                </Botao>

                                                <Botao
                                                    type="button"
                                                    variante="perigo"
                                                    onClick={() => excluir(usuario.id)}
                                                    className="px-3 py-2 text-xs"
                                                >
                                                    Excluir
                                                </Botao>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default UsuarioList;
