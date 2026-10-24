
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";

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
        }
    }, [id]);

    if (carregando) {
        return <p>Carregando dados do usuário...</p>;
    }

    if (erro || !usuario) {
        return (
            <div>
                <p>{erro || "Usuário não encontrado."}</p>
                <button onClick={() => navigate("/usuarios")}>
                    Voltar para usuários
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Detalhes do usuário</h1>

            <p><strong>ID:</strong> {usuario.id}</p>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Nome de usuário:</strong> {usuario.username}</p>
            <p><strong>E-mail:</strong> {usuario.email}</p>

            <button onClick={() => navigate("/usuarios")}>
                Voltar para usuários
            </button>
        </div>
    );
}

export default UsuarioDetailPage;
