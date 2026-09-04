import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../modules/authProvider";

function AdminRoute() {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.user?.userType || !([1, 2].includes(auth.user.userType))) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Outlet />
}

export default AdminRoute;
