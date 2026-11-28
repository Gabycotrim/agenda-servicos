
import type { Agendamento } from "../types/Agendamento";
import Botao from "./Botao";
import { temPapel, obterUsuario } from "../services/auth";

interface AgendamentoItemProps {
    agendamento: Agendamento;
    onEditar: (agendamento: Agendamento) => void;
    onCancelar: (id: number) => void;
}

function AgendamentoItem({
    agendamento,
    onEditar,
    onCancelar,
}: AgendamentoItemProps) {
    const administrador = temPapel("Administrador");
    const usuario = obterUsuario();

    const responsavelEhUsuario =
        agendamento.usuarioResponsavel?.nome === usuario?.nome;

    const podeAlterar =
        administrador || responsavelEhUsuario;

    const total = agendamento.itens.reduce(
        (soma, item) => soma + item.preco,
        0
    );

    const duracaoTotal = agendamento.itens.reduce(
        (soma, item) => soma + item.duracaoMinutos,
        0
    );

    function formatarData(data: string): string {
        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <li className="rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Agendamento #{agendamento.id}
                    </h3>

                    <p>
                        <strong>Cliente:</strong>{" "}
                        {agendamento.cliente.nome}
                    </p>

                    <p>
                        <strong>Data:</strong>{" "}
                        {formatarData(agendamento.data)}
                    </p>

                    <p>
                        <strong>Horário:</strong>{" "}
                        {agendamento.horario.substring(0, 5)}
                    </p>

                    <div>
                        <strong>Serviços:</strong>
                        <ul className="ml-5 list-disc">
                            {agendamento.itens.map((item) => (
                                <li key={item.id}>
                                    {item.servico.nome}
                                    {" - R$ "}
                                    {item.preco.toFixed(2)}
                                    {" ("}
                                    {item.duracaoMinutos} min)
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p>
                        <strong>Duração total:</strong>{" "}
                        {duracaoTotal} minutos
                    </p>

                    <p>
                        <strong>Total:</strong>{" "}
                        R$ {total.toFixed(2)}
                    </p>

                    <p>
                        <strong>Responsável:</strong>{" "}
                        {agendamento.usuarioResponsavel?.nome || "Não informado"}
                    </p>

                    {agendamento.observacoes && (
                        <p>
                            <strong>Observações:</strong>{" "}
                            {agendamento.observacoes}
                        </p>
                    )}

                    <p>
                        <strong>Status:</strong>{" "}
                        <span
                            className={
                                agendamento.status === "AGENDADO"
                                    ? "font-semibold text-green-700"
                                    : "font-semibold text-red-700"
                            }
                        >
                            {agendamento.status}
                        </span>
                    </p>
                </div>

                {agendamento.status === "AGENDADO" && podeAlterar && (
                    <div className="flex flex-wrap gap-2">
                        <Botao
                            variante="primario"
                            type="button"
                            onClick={() => onEditar(agendamento)}
                        >
                            Editar
                        </Botao>

                        <Botao
                            variante="perigo"
                            type="button"
                            onClick={() => onCancelar(agendamento.id)}
                        >
                            Cancelar agendamento
                        </Botao>
                    </div>
                )}
            </div>
        </li>
    );
}

export default AgendamentoItem;
