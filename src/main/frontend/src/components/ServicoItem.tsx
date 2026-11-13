
import type { Servico } from "../types/Servico";
import Botao from "./Botao";

interface ServicoItemProps {
    servico: Servico;
    onEditar: (servico: Servico) => void;
    onExcluir: (id: number) => void;
}

function ServicoItem({
    servico,
    onEditar,
    onExcluir,
}: ServicoItemProps) {
    return (
        <li className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4">
            <div>
                <strong>{servico.nome}</strong>
                {" - "}
                {servico.descricao}
                {" | Preço: "}
                {servico.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                })}
                {" | Duração: "}
                {servico.duracaoMinutos} minutos
            </div>

            <div className="flex gap-2">
                <Botao
                    variante="primario"
                    type="button"
                    onClick={() => onEditar(servico)}
                >
                    Editar
                </Botao>

                <Botao
                    variante="perigo"
                    type="button"
                    onClick={() => onExcluir(servico.id)}
                >
                    Excluir
                </Botao>
            </div>
        </li>
    );
}

export default ServicoItem;
