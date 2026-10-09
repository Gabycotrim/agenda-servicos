
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Servico } from "../types/Servico";
import ServicoItem from "./ServicoItem";

function ServicoList() {
    const [servicos, setServicos] = useState<Servico[]>([]);

    async function carregarServicos() {
        try {
            const resposta = await api.get<Servico[]>("/servicos");
            setServicos(resposta.data);
        } catch (erro) {
            console.error("Erro ao carregar serviços:", erro);
        }
    }

    useEffect(() => {
        carregarServicos();
    }, []);

    return (
        <div>
            <h2>Serviços cadastrados</h2>

            {servicos.length === 0 ? (
                <p>Nenhum serviço cadastrado.</p>
            ) : (
                <ul>
                    {servicos.map((servico) => (
                        <ServicoItem
                            key={servico.id}
                            servico={servico}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ServicoList;
