
import { useEffect, useState } from "react";
import api from "../services/api";
import type { ItemAgendamento } from "../types/Agendamento";
import ItemAgendamentoItem from "./ItemAgendamentoItem";

interface ItemAgendamentoListProps {
    agendamentoId: number | null;
    agendamentoAtivo: boolean;
    chaveAtualizacao: number;
    onEditar: (item: ItemAgendamento) => void;
    onExcluir: (id: number) => void;
}

function ItemAgendamentoList({
    agendamentoId,
    agendamentoAtivo,
    chaveAtualizacao,
    onEditar,
    onExcluir,
}: ItemAgendamentoListProps) {
    const [itens, setItens] = useState<ItemAgendamento[]>([]);
    const [carregando, setCarregando] = useState(false);

    async function carregarItens() {
        if (!agendamentoId) {
            setItens([]);
            return;
        }

        try {
            setCarregando(true);

            const resposta = await api.get<ItemAgendamento[]>(
                `/itens-agendamento/agendamento/${agendamentoId}`
            );

            setItens(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar itens:", erro);
            alert("Não foi possível carregar os itens do agendamento.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarItens();
    }, [agendamentoId, chaveAtualizacao]);

    return (
        <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-700">
                Serviços vinculados
            </h2>

            {!agendamentoId ? (
                <p>Selecione um agendamento para visualizar seus serviços.</p>
            ) : carregando ? (
                <p>Carregando serviços...</p>
            ) : itens.length === 0 ? (
                <p>Nenhum serviço vinculado a este agendamento.</p>
            ) : (
                <ul className="space-y-3">
                    {itens.map((item) => (
                        <ItemAgendamentoItem
                            key={item.id}
                            item={item}
                            agendamentoAtivo={agendamentoAtivo}
                            onEditar={onEditar}
                            onExcluir={onExcluir}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ItemAgendamentoList;
