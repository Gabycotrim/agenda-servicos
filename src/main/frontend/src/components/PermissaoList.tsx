import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";

function PermissaoList() {
    const [permissoes, setPermissoes] = useState<Permissao[]>([]);

    async function carregarPermissoes() {
        const resposta = await api.get<Permissao[]>("/permissoes");
        setPermissoes(resposta.data);
    }

    useEffect(() => {
        carregarPermissoes();
    }, []);

    return (
        <div>
            <h2>Permissões cadastradas</h2>

            <ul>
                {permissoes.map((permissao) => (
                    <PermissaoItem
                        key={permissao.id}
                        permissao={permissao}
                    />
                ))}
            </ul>
        </div>
    );
}

export default PermissaoList;