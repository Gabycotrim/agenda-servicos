
import type { Usuario } from "../types/Usuario";

interface UsuarioItemProps {
    usuario: Usuario;
}

function UsuarioItem({ usuario }: UsuarioItemProps) {
    return <strong>{usuario.nome}</strong>;
}

export default UsuarioItem;
