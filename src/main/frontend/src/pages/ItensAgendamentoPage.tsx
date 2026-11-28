
import { useEffect, useState } from "react";
import api from "../services/api";
import type {
    Agendamento,
    ItemAgendamento,
} from "../types/Agendamento";

import ItemAgendamentoForm from "../components/ItemAgendamentoForm";
import ItemAgendamentoList from "../components/ItemAgendamentoList";

function ItensAgendamentoPage() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [agendamentoSelecionado, setAgendamentoSelecionado] =
        useState<number | null>(null);

    const [itemEditando, setItemEditando] =
        useState<ItemAgendamento | null>(null);

    const [atualizarLista, setAtualizarLista] = useState(0);

    useEffect(() => {
        async function carregarAgendamentos() {
            try {
                const resposta = await api.get<Agendamento[]>("/agendamentos");
                setAgendamentos(resposta.data);
            } catch (erro) {
                console.error("Erro ao carregar agendamentos:", erro);
                alert("Não foi possível carregar os agendamentos.");
            }
        }

        carregarAgendamentos();
    }, []);

    const agendamentoAtual = agendamentos.find(
        (agendamento) => agendamento.id === agendamentoSelecionado
    );

    const agendamentoAtivo =
        agendamentoAtual?.status === "AGENDADO";

    function formatarData(data: string): string {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    function handleItemSalvo() {
        setAtualizarLista((valor) => valor + 1);
        setItemEditando(null);
    }

    function handleEditar(item: ItemAgendamento) {
        setItemEditando(item);
    }

    async function handleExcluir(id: number) {
        const confirmar = window.confirm(
            "Deseja realmente remover este serviço do agendamento?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/itens-agendamento/${id}`);

            alert("Serviço removido com sucesso!");

            setAtualizarLista((valor) => valor + 1);

            if (itemEditando?.id === id) {
                setItemEditando(null);
            }
        } catch (erro) {
            console.error("Erro ao remover item:", erro);
            alert(
                "Não foi possível remover o serviço. Verifique se o agendamento possui outros serviços."
            );
        }
    }

    function handleSelecionarAgendamento(valor: string) {
        setAgendamentoSelecionado(valor ? Number(valor) : null);
        setItemEditando(null);
        setAtualizarLista((anterior) => anterior + 1);
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Itens de Agendamento
            </h1>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">
                    Selecionar agendamento
                </h2>

                <select
                    value={agendamentoSelecionado ?? ""}
                    onChange={(e) =>
                        handleSelecionarAgendamento(e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                    <option value="">Selecione um agendamento</option>

                    {agendamentos.map((agendamento) => (
                        <option
                            key={agendamento.id}
                            value={agendamento.id}
                        >
                            Agendamento #{agendamento.id}
                            {" - "}
                            {agendamento.cliente.nome}
                            {" - "}
                            {formatarData(agendamento.data)}
                            {" - "}
                            {agendamento.status}
                        </option>
                    ))}
                </select>
            </section>

            {agendamentoSelecionado && agendamentoAtual && (
                <>
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-gray-700">
                            {itemEditando
                                ? "Editar serviço do agendamento"
                                : "Adicionar serviço ao agendamento"}
                        </h2>

                        {agendamentoAtivo ? (
                            <ItemAgendamentoForm
                                agendamentos={agendamentos}
                                agendamentoSelecionado={agendamentoSelecionado}
                                itemEditando={itemEditando}
                                onItemSalvo={handleItemSalvo}
                                onCancelarEdicao={() =>
                                    setItemEditando(null)
                                }
                            />
                        ) : (
                            <p className="rounded-md bg-gray-100 p-4 text-gray-600">
                                Este agendamento está cancelado. Seus itens
                                podem ser consultados, mas não alterados.
                            </p>
                        )}
                    </section>

                    <section>
                        <ItemAgendamentoList
                            agendamentoId={agendamentoSelecionado}
                            agendamentoAtivo={Boolean(agendamentoAtivo)}
                            chaveAtualizacao={atualizarLista}
                            onEditar={handleEditar}
                            onExcluir={handleExcluir}
                        />
                    </section>
                </>
            )}
        </div>
    );
}

export default ItensAgendamentoPage;
