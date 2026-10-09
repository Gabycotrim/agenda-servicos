
import type { Servico } from "../types/Servico";

interface ServicoItemProps {
    servico: Servico;
}

function ServicoItem({ servico }: ServicoItemProps) {
    return (
        <li>
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
        </li>
    );
}

export default ServicoItem;
