
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Cliente } from "../types/Cliente";
import ClienteItem from "./ClienteItem";

interface ClienteListProps {
    chaveAtualizacao: number;
    onEditar: (cliente: Cliente) => void;
    onExcluir: (id: number) => void;
}

function ClienteList({
    chaveAtualizacao,
    onEditar,
    onExcluir,
}: ClienteListProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    async function carregarClientes() {
        try {
            const resposta = await api.get<Cliente[]>("/clientes");
            setClientes(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar clientes:", erro);
        }
    }

    useEffect(() => {
        carregarClientes();
    }, [chaveAtualizacao]);

    return (
        <div>
            <h2 className="mb-3 text-lg font-semibold text-gray-700">
                Clientes cadastrados
            </h2>

            {clientes.length === 0 ? (
                <p>Nenhum cliente cadastrado.</p>
            ) : (
                <ul className="space-y-3">
                    {clientes.map((cliente) => (
                        <ClienteItem
                            key={cliente.id}
                            cliente={cliente}
                            onEditar={onEditar}
                            onExcluir={onExcluir}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ClienteList;
