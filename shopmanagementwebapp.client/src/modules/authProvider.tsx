import { createContext, useContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { User } from "../api/interfaces";
import { api } from "../api/client";

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<string>;
    logout: () => void;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            api.GET("/api/User/GetUserSession").then(response => {
                if (!response.error && response.data) {
                    setUser(response.data);
                }
                else {
                    throw Error("Error getting user");
                }
            }).catch(error => {
                console.error(error);
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            })
        }
        else {
            localStorage.removeItem("token");
        }
    }, [token])

    const login = async (email: string, password: string): Promise<string> => {
        let errorMessage = "";
        await api.POST("/api/User/Login", { body: { email: email, password: password } }).then(response => {
            const data = response.data;
            if (!response.error && data && data.success) {
                if (!data.user || !data.token) {
                    throw Error("Invalid user/token");
                }
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("token", data.token!);
            }
            else {
                throw Error(response.data.errorMessage ?? "Unknown error");
            }
        }).catch(error => {
            console.error('Login error: ', error);
            errorMessage = error;
        })
        return errorMessage;
    } 

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }  

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
}