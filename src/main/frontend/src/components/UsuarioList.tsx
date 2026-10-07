import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";
import UsuarioForm from "./UsuarioForm";

function UsuarioList() {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [editando, setEditando] = useState<Usuario | null>(null);

    async function carregarUsuarios() {
        const resposta = await api.get<Usuario[]>("/usuarios");
        setUsuarios(resposta.data);
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    async function excluir(id: number) {
        await api.delete(`/usuarios/${id}`);
        carregarUsuarios();
    }

    function editar(usuario: Usuario) {
        setEditando(usuario);
    }

    function usuarioSalvo() {
        setEditando(null);
        carregarUsuarios();
    }

    return (
        <div>

            <UsuarioForm
                key={editando?.id ?? "novo"}
                usuarioEditando={editando}
                onUsuarioSalvo={usuarioSalvo}
            />

            <h2>Usuários cadastrados</h2>

            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>

                        <UsuarioItem usuario={usuario} />

                        <button onClick={() => editar(usuario)}>
                            Editar
                        </button>

                        <button onClick={() => excluir(usuario.id)}>
                            Excluir
                        </button>

                    </li>
                ))}
            </ul>

        </div>
    );
}

export default UsuarioList;