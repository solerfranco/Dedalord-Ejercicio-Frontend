import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import isAuthenticated from "../../apis/authentications";

const ProtectedRoute = () => {
    const [auth, setAuth] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("auth-token") === null) {
            setAuth(false);
            return;
        }
        isAuthenticated().then((auth) => {
            if (!auth) {
                setAuth(false);
                localStorage.removeItem("auth-token");
            }
        });
    }, [navigate]);

    return (
        auth ? <Outlet /> : <Navigate replace to="/login" />
    );
};

export default ProtectedRoute;