
import { useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import Botao from "./Botao";

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
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    
async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Valida a senha no cadastro
    if (!usuarioEditando && !senha) {
    alert("A senha é obrigatória para cadastrar um usuário.");
    return;
    }

    // Valida o tamanho da senha
    if (senha && senha.length < 8) {
    alert("A senha deve ter pelo menos 8 caracteres.");
    return;
    }

    // Confere se as senhas são iguais
    if (senha !== confirmarSenha) {
    alert("A senha e a confirmação não são iguais.");
    return;
    }

    // Monta os dados do usuário
    const dados = {
    nome,
    username,
    email,
    ...(senha ? { senha } : {})
    };

    try {
        if (usuarioEditando) {
            await api.put(`/usuarios/${usuarioEditando.id}`, dados);

            alert("Usuário atualizado com sucesso!");
        } else {
            await api.post("/usuarios", dados);

            alert("Usuário cadastrado com sucesso!");

            // Limpa os campos após o cadastro
            setNome("");
            setUsername("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
        }

        onUsuarioSalvo();

        } catch (erro) {
            console.error("Erro ao salvar usuário:", erro);
            alert("Não foi possível salvar o usuário.");
        }
    }


    return (
        <form
            className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            onSubmit={handleSubmit}
        >
            <div className="space-y-1">
                <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700"
                >
                    Nome completo
                </label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o nome completo"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                />
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
                    placeholder="Digite o nome de usuário"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                />
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    E-mail
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                />
            </div>

            <div className="space-y-1">
    <label
        htmlFor="senha"
        className="block text-sm font-medium text-gray-700"
    >
        {usuarioEditando ? "Nova senha (opcional)" : "Senha"}
    </label>

    <input
        id="senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Digite uma senha com pelo menos 8 caracteres"
        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required={!usuarioEditando}
        minLength={8}
        autoComplete="new-password"
    />
</div>

<div className="space-y-1">
    <label
        htmlFor="confirmarSenha"
        className="block text-sm font-medium text-gray-700"
    >
        Confirmar senha
    </label>

    <input
        id="confirmarSenha"
        type="password"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        placeholder="Digite novamente a senha"
        className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required={!usuarioEditando || senha.length > 0}
        autoComplete="new-password"
    />
</div>

            <Botao type="submit">
                {usuarioEditando ? "Atualizar usuário" : "Cadastrar usuário"}
            </Botao>
        </form>
    );
}

export default UsuarioForm;
