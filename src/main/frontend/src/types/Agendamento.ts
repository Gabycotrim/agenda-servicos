
import type { Cliente } from "./Cliente";
import type { Servico } from "./Servico";

export interface ItemAgendamento {
    id: number;
    preco: number;
    duracaoMinutos: number;
    servico: Servico;
}

export interface UsuarioResponsavel {
    id: number;
    nome: string;
    username: string;
    email: string;
}

export interface Agendamento {
    id: number;
    data: string;
    horario: string;
    status: string;
    observacoes: string;
    cliente: Cliente;
    usuarioResponsavel: UsuarioResponsavel;
    itens: ItemAgendamento[];
}
