import { useState } from "react";
import { useAuth } from "../modules/authProvider";
import ErrorMessage from "../modules/errorMessage";
import type { User, UserLoginResponse } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../modules/navbar";
import styled from "styled-components";


function Login() {
    const [input, setInput] = useState({ email: "", password: "" });
    const auth = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    if (auth?.user) {
        navigate("/");
    }

    const login = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: input.email, password: input.password } as User)
        };

        fetch('/api/Login', requestOptions).then(async response => {
            const data: UserLoginResponse = await response.json();
            if (data.success) {
                auth?.setUser(data.user);
            }
            else {
                throw Error(data.errorMessage);
            }                      
        }).catch(error => {
            console.error('Login error: ', error);
            setError(error);
        })
    }    

    return (
        <>
        <Navbar />
        <FormDiv>
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