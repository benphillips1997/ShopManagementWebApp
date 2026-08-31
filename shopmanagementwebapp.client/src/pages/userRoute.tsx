import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../modules/authProvider";
import Loader from "../modules/loader";


function UserRoute() {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    if (auth?.loading) {
        return <Loader />;
    }

    if (!auth?.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return <Outlet />;
}

export default UserRoute;
