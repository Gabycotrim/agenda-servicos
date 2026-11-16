import { Navigate } from "react-router-dom";
import { obterToken } from "../services/auth";

interface RequireAuthProps {
    children: React.ReactNode;
}

function RequireAuth({ children }: RequireAuthProps) {
    const token = obterToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default RequireAuth;