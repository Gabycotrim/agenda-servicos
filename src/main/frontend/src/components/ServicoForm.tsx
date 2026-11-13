
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Servico } from "../types/Servico";
import Botao from "./Botao";

interface ServicoFormProps {
    onServicoSalvo: () => void;
    servicoEditando?: Servico | null;
    onCancelarEdicao: () => void;
}

interface ErrosFormulario {
    nome?: string;
    descricao?: string;
    preco?: string;
    duracaoMinutos?: string;
}

function ServicoForm({
    onServicoSalvo,
    servicoEditando,
    onCancelarEdicao,
}: ServicoFormProps) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [duracaoMinutos, setDuracaoMinutos] = useState("");
    const [erros, setErros] = useState<ErrosFormulario>({});

    useEffect(() => {
        if (servicoEditando) {
            setNome(servicoEditando.nome);
            setDescricao(servicoEditando.descricao);
            setPreco(String(servicoEditando.preco));
            setDuracaoMinutos(String(servicoEditando.duracaoMinutos));
        } else {
            limparFormulario();
        }
    }, [servicoEditando]);

    function limparFormulario() {
        setNome("");
        setDescricao("");
        setPreco("");
        setDuracaoMinutos("");
        setErros({});
    }

    function validarFormulario(): boolean {
        const novosErros: ErrosFormulario = {};

        if (!nome.trim()) {
            novosErros.nome = "Informe o nome do serviço.";
        }

        if (!descricao.trim()) {
            novosErros.descricao = "Informe a descrição do serviço.";
        }

        if (!preco || Number(preco) <= 0 || !Number.isFinite(Number(preco))) {
            novosErros.preco = "Informe um preço maior que zero.";
        }

        if (
            !duracaoMinutos ||
            !Number.isInteger(Number(duracaoMinutos)) ||
            Number(duracaoMinutos) <= 0
        ) {
            novosErros.duracaoMinutos =
                "Informe uma duração válida, em minutos.";
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
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: Number(preco),
            duracaoMinutos: Number(duracaoMinutos),
        };

        try {
            if (servicoEditando) {
                await api.put(`/servicos/${servicoEditando.id}`, dados);
                alert("Serviço atualizado com sucesso!");
            } else {
                await api.post("/servicos", dados);
                alert("Serviço cadastrado com sucesso!");
            }

            limparFormulario();
            onServicoSalvo();
        } catch (erro) {
            console.error("Erro ao salvar serviço:", erro);
            alert("Não foi possível salvar o serviço.");
        }
    }

    return (
        <form
            className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="space-y-1">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                    Nome do serviço
                </label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => {
                        setNome(e.target.value);
                        setErros((anterior) => ({ ...anterior, nome: "" }));
                    }}
                    placeholder="Digite o nome do serviço"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {erros.nome && (
                    <p className="text-sm text-red-600">{erros.nome}</p>
                )}
            </div>

            <div className="space-y-1">
                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição
                </label>
                <textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => {
                        setDescricao(e.target.value);
                        setErros((anterior) => ({ ...anterior, descricao: "" }));
                    }}
                    placeholder="Descreva o serviço"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {erros.descricao && (
                    <p className="text-sm text-red-600">{erros.descricao}</p>
                )}
            </div>

            <div className="space-y-1">
                <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
                    Preço (R$)
                </label>
                <input
                    id="preco"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={preco}
                    onChange={(e) => {
                        setPreco(e.target.value);
                        setErros((anterior) => ({ ...anterior, preco: "" }));
                    }}
                    placeholder="Ex.: 35.00"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {erros.preco && (
                    <p className="text-sm text-red-600">{erros.preco}</p>
                )}
            </div>

            <div className="space-y-1">
                <label htmlFor="duracaoMinutos" className="block text-sm font-medium text-gray-700">
                    Duração (minutos)
                </label>
                <input
                    id="duracaoMinutos"
                    type="number"
                    min="1"
                    step="1"
                    value={duracaoMinutos}
                    onChange={(e) => {
                        setDuracaoMinutos(e.target.value);
                        setErros((anterior) => ({
                            ...anterior,
                            duracaoMinutos: "",
                        }));
                    }}
                    placeholder="Ex.: 30"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {erros.duracaoMinutos && (
                    <p className="text-sm text-red-600">
                        {erros.duracaoMinutos}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <Botao type="submit">
                    {servicoEditando ? "Atualizar serviço" : "Cadastrar serviço"}
                </Botao>

                {servicoEditando && (
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

export default ServicoForm;
