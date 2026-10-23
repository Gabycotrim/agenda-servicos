
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Usuario } from "../types/Usuario";
import type { Permissao } from "../types/Permissao";

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
            await api.put(`/usuarios/${usuarioId}/permissoes`, permissoesSelecionadas);
            setMensagem("Permissões salvas com sucesso!");
        } catch {
            setMensagem("Erro ao salvar as permissões.");
        }
    }

    return (
        <div>
            <h1>Atribuir Permissões a Usuários</h1>

            <label htmlFor="usuario">Selecione o usuário:</label>
            <select
                id="usuario"
                value={usuarioId}
                onChange={(event) => {
                    setUsuarioId(event.target.value);
                    setMensagem("");
                }}
            >
                <option value="">Selecione...</option>
                {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.nome}
                    </option>
                ))}
            </select>

            {usuarioId && (
                <div>
                    <h2>Permissões disponíveis</h2>

                    {permissoes.map((permissao) => (
                        <label key={permissao.id} style={{ display: "block", margin: "8px 0" }}>
                            <input
                                type="checkbox"
                                checked={permissoesSelecionadas.includes(permissao.id)}
                                onChange={() => alternarPermissao(permissao.id)}
                            />
                            {" "}{permissao.nome} — {permissao.descricao}
                        </label>
                    ))}

                    <button type="button" onClick={salvarPermissoes}>
                        Salvar permissões
                    </button>
                </div>
            )}

            {mensagem && <p>{mensagem}</p>}
        </div>
    );
}

export default UsuarioPermissoesPage;
