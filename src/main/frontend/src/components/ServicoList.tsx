
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Servico } from "../types/Servico";
import ServicoItem from "./ServicoItem";

interface ServicoListProps {
    chaveAtualizacao: number;
    onEditar: (servico: Servico) => void;
    onExcluir: (id: number) => void;
}

function ServicoList({
    chaveAtualizacao,
    onEditar,
    onExcluir,
}: ServicoListProps) {
    const [servicos, setServicos] = useState<Servico[]>([]);

    async function carregarServicos() {
        try {
            const resposta = await api.get<Servico[]>("/servicos");
            setServicos(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar serviços:", erro);
        }
    }

    useEffect(() => {
        carregarServicos();
    }, [chaveAtualizacao]);

    return (
        <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-700">
                Serviços cadastrados
            </h2>

            {servicos.length === 0 ? (
                <p>Nenhum serviço cadastrado.</p>
            ) : (
                <ul className="space-y-3">
                    {servicos.map((servico) => (
                        <ServicoItem
                            key={servico.id}
                            servico={servico}
                            onEditar={onEditar}
                            onExcluir={onExcluir}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ServicoList;
