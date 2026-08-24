import { useState } from "react";
import { useAuth } from "../modules/authProvider";
import ErrorMessage from "../modules/errorMessage";

function Login() {
    const [input, setInput] = useState({ email: "", password: "" });
    const auth = useAuth();
    const [error, setError] = useState<string | null>(null);

    const tryLogin = () => {
        const errorMessage = auth?.login(input.email, input.password);

        if (errorMessage) {
            setError(errorMessage);
        }        
    }

    return (
        <div>
            <form>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={input.email}
                    onChange={(e) => setInput({...input, email: e.target.value})}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    value={input.password}
                    onChange={(e) => setInput({...input, password: e.target.value})}
                />
                <button type="button" onClick={() => tryLogin()}>Login</button>
                {!!error && <ErrorMessage message={error} />}
            </form>
        </div>
    );
}

export default Login;