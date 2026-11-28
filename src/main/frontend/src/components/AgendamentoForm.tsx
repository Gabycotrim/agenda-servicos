
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Cliente } from "../types/Cliente";
import type { Servico } from "../types/Servico";
import type { Agendamento } from "../types/Agendamento";
import Botao from "./Botao";

interface AgendamentoFormProps {
    onAgendamentoSalvo: () => void;
    agendamentoEditando?: Agendamento | null;
    onCancelarEdicao: () => void;
}

interface ErrosFormulario {
    cliente?: string;
    data?: string;
    horario?: string;
    servicos?: string;
}

function obterDataAtual(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function converterParaBrasileiro(data: string): string {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function converterParaISO(data: string): string {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
}

function validarDataBrasileira(data: string): boolean {
    const formatoValido = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!formatoValido.test(data)) {
        return false;
    }

    const [dia, mes, ano] = data.split("/").map(Number);

    const dataVerificada = new Date(ano, mes - 1, dia);

    return (
        dataVerificada.getFullYear() === ano &&
        dataVerificada.getMonth() === mes - 1 &&
        dataVerificada.getDate() === dia
    );
}

function AgendamentoForm({
    onAgendamentoSalvo,
    agendamentoEditando,
    onCancelarEdicao,
}: AgendamentoFormProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);

    const [clienteId, setClienteId] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [servicosSelecionados, setServicosSelecionados] = useState<number[]>([]);
    const [erros, setErros] = useState<ErrosFormulario>({});

    useEffect(() => {
        async function carregarDados() {
            try {
                const [respostaClientes, respostaServicos] = await Promise.all([
                    api.get<Cliente[]>("/clientes"),
                    api.get<Servico[]>("/servicos"),
                ]);

                setClientes(respostaClientes.data);
                setServicos(respostaServicos.data);
            } catch (erro) {
                console.error("Erro ao carregar clientes e serviços:", erro);
                alert("Não foi possível carregar clientes e serviços.");
            }
        }

        carregarDados();
    }, []);

    useEffect(() => {
        if (agendamentoEditando) {
            setClienteId(String(agendamentoEditando.cliente.id));
            setData(converterParaBrasileiro(agendamentoEditando.data));
            setHorario(agendamentoEditando.horario.substring(0, 5));
            setObservacoes(agendamentoEditando.observacoes || "");

            setServicosSelecionados(
                agendamentoEditando.itens.map((item) => item.servico.id)
            );
        } else {
            limparFormulario();
        }
    }, [agendamentoEditando]);

    function limparFormulario() {
        setClienteId("");
        setData("");
        setHorario("");
        setObservacoes("");
        setServicosSelecionados([]);
        setErros({});
    }

    function alternarServico(id: number) {
        setServicosSelecionados((anteriores) =>
            anteriores.includes(id)
                ? anteriores.filter((item) => item !== id)
                : [...anteriores, id]
        );

        setErros((anterior) => ({ ...anterior, servicos: "" }));
    }

    function validarFormulario(): boolean {
        const novosErros: ErrosFormulario = {};

        if (!clienteId) {
            novosErros.cliente = "Selecione um cliente.";
        }

        if (!data.trim()) {
            novosErros.data = "Informe a data do agendamento.";
        } else if (!validarDataBrasileira(data)) {
            novosErros.data = "Informe uma data válida no formato DD/MM/AAAA.";
        } else {
            const dataISO = converterParaISO(data);

            if (dataISO < obterDataAtual()) {
        novosErros.data = "A data não pode ser anterior a hoje.";
            }
        }

        if (!horario) {
            novosErros.horario = "Informe o horário.";
        }

        if (servicosSelecionados.length === 0) {
            novosErros.servicos = "Selecione pelo menos um serviço.";
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const dados = {
            data: converterParaISO(data),
            horario: `${horario}:00`,
            observacoes: observacoes.trim(),
            cliente: {
                id: Number(clienteId),
            },
            itens: servicosSelecionados.map((id) => ({
                servico: { id },
            })),
        };

        try {
            if (agendamentoEditando) {
                await api.put(
                    `/agendamentos/${agendamentoEditando.id}`,
                    dados
                );
                alert("Agendamento atualizado com sucesso!");
            } else {
                await api.post("/agendamentos", dados);
                alert("Agendamento cadastrado com sucesso!");
            }

            limparFormulario();
            onAgendamentoSalvo();
        } catch (erro) {
            console.error("Erro ao salvar agendamento:", erro);
            alert("Não foi possível salvar o agendamento. Verifique os dados e tente novamente.");
        }
    }

    const totalServicos = servicos
        .filter((servico) => servicosSelecionados.includes(servico.id))
        .reduce((total, servico) => total + servico.preco, 0);

    return (
        <form
            className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="space-y-1">
                <label htmlFor="clienteAgendamento" className="block text-sm font-medium text-gray-700">
                    Cliente
                </label>

                <select
                    id="clienteAgendamento"
                    value={clienteId}
                    onChange={(e) => {
                        setClienteId(e.target.value);
                        setErros((anterior) => ({ ...anterior, cliente: "" }));
                    }}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                    <option value="">Selecione um cliente</option>
                    {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                        </option>
                    ))}
                </select>

                {erros.cliente && (
                    <p className="text-sm text-red-600">{erros.cliente}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                    <label htmlFor="dataAgendamento" className="block text-sm font-medium text-gray-700">
                        Data
                    </label>

                    <input
                        id="dataAgendamento"
                        type="text"
                        placeholder="DD/MM/AAAA"
                        maxLength={10}
                        inputMode="numeric"
                        value={data}
                        onChange={(e) => {
                            setData(e.target.value);
                            setErros((anterior) => ({ ...anterior, data: "" }));
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    {erros.data && (
                        <p className="text-sm text-red-600">{erros.data}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="horarioAgendamento" className="block text-sm font-medium text-gray-700">
                        Horário
                    </label>

                    <input
                        id="horarioAgendamento"
                        type="time"
                        value={horario}
                        onChange={(e) => {
                            setHorario(e.target.value);
                            setErros((anterior) => ({ ...anterior, horario: "" }));
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                    />

                    {erros.horario && (
                        <p className="text-sm text-red-600">{erros.horario}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Serviços
                </label>

                {servicos.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        Nenhum serviço cadastrado.
                    </p>
                ) : (
                    <div className="space-y-2 rounded-md border border-gray-200 p-3">
                        {servicos.map((servico) => (
                            <label
                                key={servico.id}
                                className="flex items-center justify-between gap-3"
                            >
                                <span className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={servicosSelecionados.includes(servico.id)}
                                        onChange={() => alternarServico(servico.id)}
                                    />
                                    {servico.nome}
                                </span>

                                <span className="text-sm text-gray-600">
                                    R$ {servico.preco.toFixed(2)}
                                    {" | "}
                                    {servico.duracaoMinutos} min
                                </span>
                            </label>
                        ))}
                    </div>
                )}

                {erros.servicos && (
                    <p className="text-sm text-red-600">{erros.servicos}</p>
                )}

                <p className="text-right font-semibold text-gray-800">
                    Total: R$ {totalServicos.toFixed(2)}
                </p>
            </div>

            <div className="space-y-1">
                <label htmlFor="observacoesAgendamento" className="block text-sm font-medium text-gray-700">
                    Observações
                </label>

                <textarea
                    id="observacoesAgendamento"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Observações adicionais (opcional)"
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <Botao type="submit">
                    {agendamentoEditando
                        ? "Atualizar agendamento"
                        : "Cadastrar agendamento"}
                </Botao>

                {agendamentoEditando && (
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

export default AgendamentoForm;
