import { useState } from "react";
import { useAuth } from "../modules/authProvider";
import ErrorMessage from "../modules/errorMessage";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../modules/navbar";
import styled from "styled-components";
import { api } from "../api/client";
import Loader from "../modules/loader";


function Login() {
    const [input, setInput] = useState({ email: "", password: "" });
    const auth = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loggingIn, setLoggingIn] = useState(false);

    const login = () => {
        setLoggingIn(true);
        api.POST("/api/Login", { body: { email: input.email, password: input.password } }).then(response => {
            if (!response.error && response.data.success) {
                auth?.setUser(response.data.user!);
                navigate("/");
            }
            else {
                throw Error(response.data.errorMessage ?? "Unknown error");
            }
        }).catch(error => {
            console.error('Login error: ', error);
            setError(error);
        }).finally(() => setLoggingIn(false))
    }    

    return (
        <>
        <Navbar />
        <FormDiv>
            {!loggingIn ?
            <FormContainer action={() => login()}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={input.email}
                    onChange={(e) => setInput({...input, email: e.target.value})}
                    minLength={5}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    value={input.password}
                    onChange={(e) => setInput({...input, password: e.target.value})}
                    minLength={3}
                />
                <br />
                <button type="submit">Login</button>
                <br />
                <Link to='/register'>Don't have an account? Register</Link>
                <br />
                {!!error && <ErrorMessage message={error} />}
            </FormContainer>
            : <Loader visible={loggingIn} />}
        </FormDiv>
        </>
    );
}

export default Login;

const FormDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
`

const FormContainer = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;    
`