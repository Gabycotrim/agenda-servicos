import { useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";

interface UsuarioFormProps {
    onUsuarioSalvo: () => void;
    usuarioEditando?: Usuario | null;
}

function UsuarioForm({
    onUsuarioSalvo,
    usuarioEditando
}: UsuarioFormProps) {

    const [nome, setNome] = useState(usuarioEditando?.nome ?? "");
    const [username, setUsername] = useState(usuarioEditando?.username ?? "");
    const [email, setEmail] = useState(usuarioEditando?.email ?? "");

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const dados = {
            nome,
            username,
            email
        };

        if (usuarioEditando) {
            await api.put(`/usuarios/${usuarioEditando.id}`, dados);
        } else {
            await api.post("/usuarios", dados);
        }

        onUsuarioSalvo();
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label>E-mail:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button type="submit">
                {usuarioEditando ? "Atualizar" : "Cadastrar"}
            </button>

        </form>
    );
}

export default UsuarioForm;