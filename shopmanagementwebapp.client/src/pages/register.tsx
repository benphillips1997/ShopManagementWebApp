import { useState } from "react";
import ErrorMessage from "../modules/errorMessage";
import { useNavigate } from "react-router-dom";
import Navbar from "../modules/navbar";
import styled from "styled-components";
import { api } from "../api/client";

function Register() {
    const [formData, setFormData] = useState(
        { email: "", password: "", firstName: "", lastName: "", address: "", country: "", phone: "" }
    );
    const navigation = useNavigate();
    const [error, setError] = useState<string>();

    const register = () => {
        api.POST("/api/AddUser", { body: { ...formData, userType: 0, basket: { items: [] }, orders: [] }}).then(response => {            
            if (response.data) {
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
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    required 
                    minLength={1}
                />
                <br />
                <label htmlFor="lastName">Last name:</label>
                <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    required 
                    minLength={1}
                />
                <br />
                <label htmlFor="address">Address:</label>
                <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    required 
                    minLength={4}
                />
                <br />
                <label htmlFor="country">Country:</label>
                <input 
                    type="text" 
                    id="country" 
                    name="country" 
                    required 
                    minLength={4}
                />
                <br />
                <label htmlFor="phone">Phone:</label>
                <input 
                    type="tel" 
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