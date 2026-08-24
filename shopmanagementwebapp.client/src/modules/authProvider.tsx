import { createContext, useContext, useState } from "react";
import type { User, UserLoginResponse } from "../interfaces";
import { redirect, useNavigate } from "react-router-dom";
import ErrorMessage from "./errorMessage";

interface AuthContextType {
    user: User;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const defaultUser: User = {
    userType: 3
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(defaultUser);
    //const navigate = useNavigate();

    const login = (email: string, password: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password } as User)
        };

        fetch('/api/Login', requestOptions).then(async response => {
            const data: UserLoginResponse = await response.json();
            if (data.success) {
                setUser(data.user);
                redirect('/');  
            }
            else {
                throw Error(data.errorMessage);
            }                      
        }).catch(error => {
            console.error('Login error: ', error);
            return error;
        })
    }

    const logout = () => {
        setUser(defaultUser);
        redirect('/login');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}