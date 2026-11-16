export interface Sessao {
    token: string;
    nome: string;
    permissoes: string[];
}

const CHAVE_TOKEN = "token";
const CHAVE_USUARIO = "usuario";

export function salvarSessao(sessao: Sessao): void {
    localStorage.setItem(CHAVE_TOKEN, sessao.token);
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify({
        nome: sessao.nome,
        permissoes: sessao.permissoes
    }));
}

export function obterToken(): string | null {
    return localStorage.getItem(CHAVE_TOKEN);
}

export function obterUsuario(): { nome: string; permissoes: string[] } | null {
    const usuario = localStorage.getItem(CHAVE_USUARIO);

    return usuario ? JSON.parse(usuario) : null;
}

export function temPapel(papel: string): boolean {
    const usuario = obterUsuario();

    return usuario?.permissoes.includes(papel) ?? false;
}

export function sair(): void {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_USUARIO);
}