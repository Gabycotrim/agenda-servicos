
import { useState } from "react";
import AgendamentoList from "../components/AgendamentoList";
import AgendamentoForm from "../components/AgendamentoForm";
import api from "../services/api";
import type { Agendamento } from "../types/Agendamento";

function AgendamentosPage() {
    const [atualizarLista, setAtualizarLista] = useState(0);
    const [agendamentoEditando, setAgendamentoEditando] =
        useState<Agendamento | null>(null);

    function handleAgendamentoSalvo() {
        setAtualizarLista((valor) => valor + 1);
        setAgendamentoEditando(null);
    }

    function handleEditar(agendamento: Agendamento) {
        setAgendamentoEditando(agendamento);
    }

    async function handleCancelar(id: number) {
        const confirmar = window.confirm(
            "Deseja realmente cancelar este agendamento?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/agendamentos/${id}`);

            alert("Agendamento cancelado com sucesso!");

            setAtualizarLista((valor) => valor + 1);

            if (agendamentoEditando?.id === id) {
                setAgendamentoEditando(null);
            }
        } catch (erro) {
            console.error("Erro ao cancelar agendamento:", erro);
            alert("Não foi possível cancelar o agendamento.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Agendamentos
            </h1>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">
                    {agendamentoEditando
                        ? "Editar agendamento"
                        : "Cadastrar novo agendamento"}
                </h2>

                <AgendamentoForm
                    onAgendamentoSalvo={handleAgendamentoSalvo}
                    agendamentoEditando={agendamentoEditando}
                    onCancelarEdicao={() => setAgendamentoEditando(null)}
                />
            </section>

            <section>
                <AgendamentoList
                    chaveAtualizacao={atualizarLista}
                    onEditar={handleEditar}
                    onCancelar={handleCancelar}
                />
            </section>
        </div>
    );
}

export default AgendamentosPage;
