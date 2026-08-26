import { useState } from "react";
import ErrorMessage from "../modules/errorMessage";
import type { User } from "../interfaces";
import { redirect, useNavigate } from "react-router-dom";
import Navbar from "../modules/navbar";
import styled from "styled-components";

function Register() {
    const [formData, setFormData] = useState(
        { email: "", password: "", firstName: "", lastName: "", address: "", country: "", phone: "" }
    );
    const navigation = useNavigate();
    const [error, setError] = useState<string>();

    const register = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData as User)
        };

        fetch('/api/AddUser', requestOptions).then(async response => {
            const data = await response.json();
            if (!!data) {
                navigation('/login');
            }
            else {
                throw Error("Failed to register account");
            }                      
        }).catch(error => {
            console.error('Registration error: ', error);
            setError(error);
        })
    }

    return (
        <>
        <Navbar />
        <FormDiv>
            <FormContainer action={() => register()} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required              
                    minLength={5}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    minLength={3}
                />
                <br />
                <label htmlFor="firstName">First name:</label>
                <input 
                    type="firstName" 
                    id="firstName" 
                    name="firstName" 
                    required 
                    minLength={1}
                />
                <br />
                <label htmlFor="lastName">Last name:</label>
                <input 
                    type="lastName" 
                    id="lastName" 
                    name="lastName" 
                    required 
                    minLength={1}
                />
                <br />
                <label htmlFor="address">Address:</label>
                <input 
                    type="address" 
                    id="address" 
                    name="address" 
                    required 
                    minLength={4}
                />
                <br />
                <label htmlFor="country">Country:</label>
                <input 
                    type="country" 
                    id="country" 
                    name="country" 
                    required 
                    minLength={4}
                />
                <br />
                <label htmlFor="phone">Phone:</label>
                <input 
                    type="phone" 
                    id="phone" 
                    name="phone" 
                    required 
                    minLength={5}
                />
                <br />
                <button type="submit">Register</button>
                {!!error && <ErrorMessage message={error} />}
            </FormContainer>
        </FormDiv>
        </>
    );
}

export default Register;

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