
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Cliente } from "../types/Cliente";
import Botao from "./Botao";

interface ClienteFormProps {
    onClienteSalvo: () => void;
    clienteEditando?: Cliente | null;
    onCancelarEdicao: () => void;
}

interface ErrosFormulario {
    nome?: string;
    telefone?: string;
    email?: string;
}

function ClienteForm({
    onClienteSalvo,
    clienteEditando,
    onCancelarEdicao,
}: ClienteFormProps) {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [erros, setErros] = useState<ErrosFormulario>({});

    useEffect(() => {
        if (clienteEditando) {
            setNome(clienteEditando.nome);
            setTelefone(clienteEditando.telefone);
            setEmail(clienteEditando.email);
        } else {
            limparFormulario();
        }
    }, [clienteEditando]);

    function limparFormulario() {
        setNome("");
        setTelefone("");
        setEmail("");
        setErros({});
    }

    function validarFormulario(): boolean {
        const novosErros: ErrosFormulario = {};

        if (!nome.trim()) {
            novosErros.nome = "Informe o nome do cliente.";
        }

        if (!telefone.trim()) {
            novosErros.telefone = "Informe o telefone do cliente.";
        }

        if (!email.trim()) {
            novosErros.email = "Informe o e-mail do cliente.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            novosErros.email = "Informe um e-mail válido.";
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
            telefone: telefone.trim(),
            email: email.trim(),
        };

        try {
            if (clienteEditando) {
                await api.put(`/clientes/${clienteEditando.id}`, dados);
                alert("Cliente atualizado com sucesso!");
            } else {
                await api.post("/clientes", dados);
                alert("Cliente cadastrado com sucesso!");
            }

            limparFormulario();
            onClienteSalvo();
        } catch (erro) {
            console.error("Erro ao salvar cliente:", erro);
            alert("Não foi possível salvar o cliente.");
        }
    }

    return (
        <form
            className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            onSubmit={handleSubmit}
            noValidate
        >
            <div className="space-y-1">
                <label htmlFor="nomeCliente" className="block text-sm font-medium text-gray-700">
                    Nome do cliente
                </label>
                <input
                    id="nomeCliente"
                    type="text"
                    value={nome}
                    onChange={(e) => {
                        setNome(e.target.value);
                        setErros((anterior) => ({ ...anterior, nome: "" }));
                    }}
                    placeholder="Digite o nome do cliente"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {erros.nome && (
                    <p className="text-sm text-red-600">{erros.nome}</p>
                )}
            </div>

            <div className="space-y-1">
                <label htmlFor="telefoneCliente" className="block text-sm font-medium text-gray-700">
                    Telefone
                </label>
                <input
                    id="telefoneCliente"
                    type="tel"
                    value={telefone}
                    onChange={(e) => {
                        setTelefone(e.target.value);
                        setErros((anterior) => ({ ...anterior, telefone: "" }));
                    }}
                    placeholder="Ex.: (62) 99999-9999"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {erros.telefone && (
                    <p className="text-sm text-red-600">{erros.telefone}</p>
                )}
            </div>

            <div className="space-y-1">
                <label htmlFor="emailCliente" className="block text-sm font-medium text-gray-700">
                    E-mail
                </label>
                <input
                    id="emailCliente"
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setErros((anterior) => ({ ...anterior, email: "" }));
                    }}
                    placeholder="Ex.: cliente@email.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
                {erros.email && (
                    <p className="text-sm text-red-600">{erros.email}</p>
                )}
            </div>

            <div className="flex flex-wrap gap-2">
                <Botao type="submit">
                    {clienteEditando ? "Atualizar cliente" : "Cadastrar cliente"}
                </Botao>

                {clienteEditando && (
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

export default ClienteForm;
