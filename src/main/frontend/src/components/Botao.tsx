
import type { ButtonHTMLAttributes } from "react";

type BotaoProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variante?: "primario" | "perigo" | "neutro";
};

function Botao({
    variante = "primario",
    className = "",
    children,
    ...props
}: BotaoProps) {
    const estilos = {
        primario: "bg-blue-600 text-white hover:bg-blue-700",
        perigo: "bg-red-600 text-white hover:bg-red-700",
        neutro: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    };

    return (
        <button
            className={`rounded-md px-4 py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${estilos[variante]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Botao;
