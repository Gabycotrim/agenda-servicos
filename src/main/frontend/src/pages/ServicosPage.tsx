
import { useState } from "react";
import ServicoList from "../components/ServicoList";
import ServicoForm from "../components/ServicoForm";
import api from "../services/api";
import type { Servico } from "../types/Servico";

function ServicosPage() {
    const [atualizarLista, setAtualizarLista] = useState(0);
    const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);

    function handleServicoSalvo() {
        setAtualizarLista((valor) => valor + 1);
        setServicoEditando(null);
    }

    function handleEditar(servico: Servico) {
        setServicoEditando(servico);
    }

    async function handleExcluir(id: number) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este serviço?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/servicos/${id}`);
            alert("Serviço excluído com sucesso!");
            setAtualizarLista((valor) => valor + 1);

            if (servicoEditando?.id === id) {
                setServicoEditando(null);
            }
        } catch (erro) {
            console.error("Erro ao excluir serviço:", erro);
            alert("Não foi possível excluir o serviço.");
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">
                Serviços da Agenda
            </h1>

            <section className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">
                    {servicoEditando ? "Editar serviço" : "Cadastrar novo serviço"}
                </h2>

                <ServicoForm
                    onServicoSalvo={handleServicoSalvo}
                    servicoEditando={servicoEditando}
                    onCancelarEdicao={() => setServicoEditando(null)}
                />
            </section>

            <section>
                <ServicoList
                    chaveAtualizacao={atualizarLista}
                    onEditar={handleEditar}
                    onExcluir={handleExcluir}
                />
            </section>
        </div>
    );
}

export default ServicosPage;
