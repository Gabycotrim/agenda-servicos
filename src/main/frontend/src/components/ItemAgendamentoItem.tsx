
import type { ItemAgendamento } from "../types/Agendamento";
import Botao from "./Botao";

interface ItemAgendamentoItemProps {
    item: ItemAgendamento;
    agendamentoAtivo: boolean;
    onEditar: (item: ItemAgendamento) => void;
    onExcluir: (id: number) => void;
}

function ItemAgendamentoItem({
    item,
    agendamentoAtivo,
    onEditar,
    onExcluir,
}: ItemAgendamentoItemProps) {
    return (
        <li className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4">
            <div>
                <strong>{item.servico.nome}</strong>

                <p className="text-sm text-gray-600">
                    {item.servico.descricao}
                </p>

                <p className="text-sm text-gray-600">
                    Preço: R$ {item.preco.toFixed(2)}
                    {" | "}
                    Duração: {item.duracaoMinutos} minutos
                </p>
            </div>

            {agendamentoAtivo && (
                <div className="flex gap-2">
                    <Botao
                        variante="primario"
                        type="button"
                        onClick={() => onEditar(item)}
                    >
                        Editar
                    </Botao>

                    <Botao
                        variante="perigo"
                        type="button"
                        onClick={() => onExcluir(item.id)}
                    >
                        Remover
                    </Botao>
                </div>
            )}
        </li>
    );
}

export default ItemAgendamentoItem;
