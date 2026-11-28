
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Agendamento } from "../types/Agendamento";
import AgendamentoItem from "./AgendamentoItem";

interface AgendamentoListProps {
    chaveAtualizacao: number;
    onEditar: (agendamento: Agendamento) => void;
    onCancelar: (id: number) => void;
}

function AgendamentoList({
    chaveAtualizacao,
    onEditar,
    onCancelar,
}: AgendamentoListProps) {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [carregando, setCarregando] = useState(true);

    async function carregarAgendamentos() {
        try {
            setCarregando(true);

            const resposta = await api.get<Agendamento[]>("/agendamentos");

            setAgendamentos(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar agendamentos:", erro);
            alert("Não foi possível carregar os agendamentos.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarAgendamentos();
    }, [chaveAtualizacao]);

    return (
        <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-700">
                Agendamentos cadastrados
            </h2>

            {carregando ? (
                <p>Carregando agendamentos...</p>
            ) : agendamentos.length === 0 ? (
                <p>Nenhum agendamento cadastrado.</p>
            ) : (
                <ul className="space-y-3">
                    {agendamentos.map((agendamento) => (
                        <AgendamentoItem
                            key={agendamento.id}
                            agendamento={agendamento}
                            onEditar={onEditar}
                            onCancelar={onCancelar}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AgendamentoList;
