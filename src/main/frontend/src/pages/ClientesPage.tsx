
import { useState } from "react";
import ClienteList from "../components/ClienteList";
import ClienteForm from "../components/ClienteForm";
import api from "../services/api";
import type { Cliente } from "../types/Cliente";

function ClientesPage() {
    const [atualizarLista, setAtualizarLista] = useState(0);
    const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

    function handleClienteSalvo() {
        setAtualizarLista((valor) => valor + 1);
        setClienteEditando(null);
    }

    function handleEditar(cliente: Cliente) {
        setClienteEditando(cliente);
    }

    async function handleExcluir(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este cliente?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/clientes/${id}`);
            alert("Cliente excluído com sucesso!");
            setAtualizarLista((valor) => valor + 1);

            if (clienteEditando?.id === id) {
                setClienteEditando(null);
            }
        } catch (erro) {
            console.error("Erro ao excluir cliente:", erro);
            alert("Não foi possível excluir o cliente.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Clientes da Agenda
            </h1>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">
                    {clienteEditando
                        ? "Editar cliente"
                        : "Cadastrar novo cliente"}
                </h2>

                <ClienteForm
                    onClienteSalvo={handleClienteSalvo}
                    clienteEditando={clienteEditando}
                    onCancelarEdicao={() => setClienteEditando(null)}
                />
            </section>

            <section>
                <ClienteList
                    chaveAtualizacao={atualizarLista}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </section>
        </div>
    );
}

export default ClientesPage;
