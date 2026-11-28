
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Agendamento } from "../types/Agendamento";
import type { Servico } from "../types/Servico";
import Botao from "./Botao";

interface ItemAgendamentoFormProps {
    agendamentos: Agendamento[];
    agendamentoSelecionado: number | null;
    itemEditando?: {
        id: number;
        servico: Servico;
    } | null;
    onItemSalvo: () => void;
    onCancelarEdicao: () => void;
}

function ItemAgendamentoForm({
    agendamentos,
    agendamentoSelecionado,
    itemEditando,
    onItemSalvo,
    onCancelarEdicao,
}: ItemAgendamentoFormProps) {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [servicoId, setServicoId] = useState("");
    const [erros, setErros] = useState("");

    useEffect(() => {
        async function carregarServicos() {
            try {
                const resposta = await api.get<Servico[]>("/servicos");
                setServicos(resposta.data);
            } catch (erro) {
                console.error("Erro ao carregar serviços:", erro);
                alert("Não foi possível carregar os serviços.");
            }
        }

        carregarServicos();
    }, []);

    useEffect(() => {
        if (itemEditando) {
            setServicoId(String(itemEditando.servico.id));
        } else {
            setServicoId("");
            setErros("");
        }
    }, [itemEditando]);

    const agendamentoAtual = agendamentos.find(
        (agendamento) => agendamento.id === agendamentoSelecionado
    );

    function validarFormulario(): boolean {
        if (!agendamentoSelecionado) {
            setErros("Selecione um agendamento.");
            return false;
        }

        if (!servicoId) {
            setErros("Selecione um serviço.");
            return false;
        }

        if (agendamentoAtual?.status !== "AGENDADO") {
            setErros("Somente agendamentos ativos podem ser alterados.");
            return false;
        }

        setErros("");
        return true;
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!validarFormulario() || !agendamentoSelecionado) {
            return;
        }

        try {
            if (itemEditando) {
                await api.put(`/itens-agendamento/${itemEditando.id}`, {
                    servico: { id: Number(servicoId) },
                });

                alert("Item atualizado com sucesso!");
            } else {
                await api.post(
                    `/itens-agendamento/agendamento/${agendamentoSelecionado}`,
                    {
                        servico: { id: Number(servicoId) },
                    }
                );

                alert("Serviço adicionado ao agendamento com sucesso!");
            }

            setServicoId("");
            onItemSalvo();
        } catch (erro) {
            console.error("Erro ao salvar item:", erro);
            alert("Não foi possível salvar o item do agendamento.");
        }
    }

    return (
        <form
            className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="space-y-1">
                <label
                    htmlFor="servicoItemAgendamento"
                    className="block text-sm font-medium text-gray-700"
                >
                    Serviço
                </label>

                <select
                    id="servicoItemAgendamento"
                    value={servicoId}
                    onChange={(e) => {
                        setServicoId(e.target.value);
                        setErros("");
                    }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                    <option value="">Selecione um serviço</option>

                    {servicos.map((servico) => (
                        <option key={servico.id} value={servico.id}>
                            {servico.nome} - R$ {servico.preco.toFixed(2)}
                            {" ("}{servico.duracaoMinutos} min)
                        </option>
                    ))}
                </select>
            </div>

            {erros && (
                <p className="text-sm text-red-600">{erros}</p>
            )}

            <div className="flex flex-wrap gap-2">
                <Botao type="submit">
                    {itemEditando ? "Atualizar item" : "Adicionar serviço"}
                </Botao>

                {itemEditando && (
                    <Botao
                        type="button"
                        variante="neutro"
                        onClick={onCancelarEdicao}
                    >
                        Cancelar
                    </Botao>
                )}
            </div>
        </form>
    );
}

export default ItemAgendamentoForm;
