import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";
import type { User, UserLoginResponse } from "../interfaces";
import { redirect, useNavigate } from "react-router-dom";
import ErrorMessage from "./errorMessage";

export interface AuthContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    //console.log(useContext(AuthContext));
    return useContext(AuthContext);
}