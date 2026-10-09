
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";
import UsuarioForm from "./UsuarioForm";

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
        <div className="usuarios-container">
            <header className="usuarios-cabecalho">
                <div>
                    <h2>Usuários cadastrados</h2>
                    <p>Consulte e gerencie os usuários do sistema.</p>
                </div>

                <span className="usuarios-contador">
                    {usuarios.length}{" "}
                    {usuarios.length === 1 ? "usuário" : "usuários"}
                </span>
            </header>

            <section className="usuarios-formulario">
                <h3>
                    {editando ? "Editar usuário" : "Cadastrar usuário"}
                </h3>

                <UsuarioForm
                    key={editando?.id ?? "novo"}
                    usuarioEditando={editando}
                    onUsuarioSalvo={usuarioSalvo}
                />

                {editando && (
                    <button
                        type="button"
                        className="botao-cancelar"
                        onClick={() => setEditando(null)}
                    >
                        Cancelar edição
                    </button>
                )}
            </section>

            <section className="usuarios-tabela-container">
                <div className="tabela-scroll">
                    <table className="usuarios-tabela">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Usuário</th>
                                <th>E-mail</th>
                                <th className="coluna-acoes">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {usuarios.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="tabela-vazia">
                                        Nenhum usuário cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>
                                            <UsuarioItem usuario={usuario} />
                                        </td>
                                        <td>{usuario.username}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <div className="acoes-tabela">
                                                <button
                                                    type="button"
                                                    className="botao-editar"
                                                    onClick={() => editar(usuario)}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="botao-excluir"
                                                    onClick={() => excluir(usuario.id)}
                                                >
                                                    Excluir
                                                </button>
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
