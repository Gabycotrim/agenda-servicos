
import type { Cliente } from "../types/Cliente";
import Botao from "./Botao";
import { temPapel } from "../services/auth";

interface ClienteItemProps {
    cliente: Cliente;
    onEditar: (cliente: Cliente) => void;
    onExcluir: (id: number) => void;
}

function ClienteItem({
    cliente,
    onEditar,
    onExcluir,
}: ClienteItemProps) {
    const administrador = temPapel("Administrador");

    return (
        <li className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4">
            <div>
                <strong>{cliente.nome}</strong>
                {" | Telefone: "}
                {cliente.telefone}
                {" | E-mail: "}
                {cliente.email}
            </div>

            <div className="flex gap-2">
                <Botao
                    variante="primario"
                    type="button"
                    onClick={() => onEditar(cliente)}
                >
                    Editar
                </Botao>

                {administrador && (
                    <Botao
                        variante="perigo"
                        type="button"
                        onClick={() => onExcluir(cliente.id)}
                    >
                        Excluir
                    </Botao>
                )}
            </div>
        </li>
    );
}

export default ClienteItem;
