
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

        const dados = { nome, username, email };

        try {
            if (usuarioEditando) {
                await api.put(`/usuarios/${usuarioEditando.id}`, dados);
            } else {
                await api.post("/usuarios", dados);
            }

            onUsuarioSalvo();
        } catch (erro) {
            console.error("Erro ao salvar usuário:", erro);
            alert("Não foi possível salvar o usuário.");
        }
    }

    return (
        <form className="usuario-form" onSubmit={handleSubmit}>
            <div className="campo-form">
                <label htmlFor="nome">Nome completo</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome completo"
                    required
                />
            </div>

            <div className="campo-form">
                <label htmlFor="username">Nome de usuário</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite o nome de usuário"
                    required
                />
            </div>

            <div className="campo-form">
                <label htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    required
                />
            </div>

            <button className="botao-salvar" type="submit">
                {usuarioEditando ? "Atualizar usuário" : "Cadastrar usuário"}
            </button>
        </form>
    );
}

export default UsuarioForm;
