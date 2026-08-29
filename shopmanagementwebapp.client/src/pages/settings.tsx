import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Navbar from "../modules/navbar";
import { useState } from "react";
import { useAuth } from "../modules/authProvider";
import { api } from "../api/client";
import styled from "styled-components";
import type { UpdateUserRequest } from "../api/interfaces";

function Settings() {
    const auth = useAuth();
    const user = useAuth()?.user;
    const defaultFormData: Record<string, string> = {
        email: user?.email ?? "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        address: user?.address ?? "",
        country: user?.country ?? "",
        phone: user?.phone ?? ""
    };
    const [formData, setFormData] = useState(defaultFormData);
    const [editForm, setEditForm] = useState<Record<string, boolean>>(
        () => Object.keys(defaultFormData).reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );

    const updateDetails = () => {
        if (editForm.currentPassword && formData.newPassword !== formData.confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        const dataToSend: UpdateUserRequest = {
            userId: user?.id!,
            newEmail: editForm.email ? formData.email : undefined,
            currentPassword: editForm.currentPassword ? formData.currentPassword : undefined,
            newPassword: editForm.newPassword ? formData.newPassword : undefined,
            newFirstName: editForm.firstName ? formData.firstName : undefined,
            newLastName: editForm.lastName ? formData.lastName : undefined,
            newAddress: editForm.address ? formData.address : undefined,
            newCountry: editForm.country ? formData.country : undefined,
            newPhone: editForm.phone ? formData.phone : undefined
        };

        api.POST("/api/UpdateUser", { body: dataToSend }).then(response => {
            if (response.data) {
                api.GET("/api/GetUser/{id}", { params: { path: { id: user?.id! }}}).then(response => {
                    if (response.data) {
                        auth?.setUser(response.data);
                        setEditForm(() => Object.keys(defaultFormData).reduce((acc, key) => ({ ...acc, [key]: false }), {}));
                        console.log("Successfully updated user");
                    }
                    else {
                        throw Error("Error: failed to retrieve updated user");
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
            else {
                throw Error("Failed to update user");
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const toggleEdit = (key: string) => {
        if (key === "password") {
            setEditForm({ ...editForm, currentPassword: !editForm.currentPassword, newPassword: !editForm.newPassword, confirmPassword: !editForm.confirmPassword });

            if (!defaultFormData.currentPassword) {
                setFormData({ ...formData, currentPassword: defaultFormData.currentPassword, 
                    newPassword: defaultFormData.newPassword, confirmPassword: defaultFormData.confirmPassword 
                });
            }
        }
        else {
            const value = !editForm[key];
            setEditForm({ ...editForm, [key]: value });

            if (!value) {
                setFormData({ ...formData, [key]: defaultFormData[key] });
            }
        }        
    }

    return (
    <>
        <Navbar />
        <div className="center">
            <TabContainer className="center-column">
                <TabList>
                    <Tab>Update details</Tab>
                </TabList>
                <TabPanel>
                    <form action={() => updateDetails()} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} className="center-column">
                        <div>
                            <label htmlFor="email">Email:</label><br />
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required              
                                minLength={5}
                                disabled={!editForm.email}
                                value={formData.email}
                            />
                            <button type="button" onClick={() => toggleEdit("email")}>{!editForm.email ? "Update" : "Cancel"}</button>
                        </div>
                        <br />
                        <div className="center-column">
                            <label htmlFor="changePassword">Change password</label><br />
                            <label htmlFor="currentPassword">Current password:</label>
                            <input 
                                type="password" 
                                id="currentPassword" 
                                name="currentPassword" 
                                required 
                                minLength={3}
                                disabled={!editForm.currentPassword}
                                value={formData.currentPassword}
                            />
                            <br />
                            <label htmlFor="newPassword">New password:</label>                            
                            <input 
                                type="password" 
                                id="newPassword" 
                                name="newPassword" 
                                required 
                                minLength={3}
                                disabled={!editForm.newPassword}
                                value={formData.newPassword}
                            />
                            <br />
                            <label htmlFor="confirmPassword">Confirm new password:</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                required 
                                minLength={3}
                                disabled={!editForm.confirmPassword}
                                value={formData.confirmPassword}
                            />
                            <button type="button" onClick={() => toggleEdit("password")}>{!editForm.currentPassword ? "Update" : "Cancel"}</button>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="firstName">First name:</label><br />
                            <input 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                required 
                                minLength={1}
                                disabled={!editForm.firstName}
                                value={formData.firstName}
                            />
                            <button type="button" onClick={() => toggleEdit("firstName")}>{!editForm.firstName ? "Update" : "Cancel"}</button>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="lastName">Last name:</label><br />
                            <input 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                required 
                                minLength={1}
                                disabled={!editForm.lastName}
                                value={formData.lastName}
                            />
                            <button type="button" onClick={() => toggleEdit("lastName")}>{!editForm.lastName ? "Update" : "Cancel"}</button>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="address">Address:</label><br />
                            <input 
                                type="text" 
                                id="address" 
                                name="address" 
                                required 
                                minLength={4}
                                disabled={!editForm.address}
                                value={formData.address}
                            />
                            <button type="button" onClick={() => toggleEdit("address")}>{!editForm.address ? "Update" : "Cancel"}</button>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="country">Country:</label><br />
                            <input 
                                type="text" 
                                id="country" 
                                name="country" 
                                required 
                                minLength={4}
                                disabled={!editForm.country}
                                value={formData.country}
                            />
                            <button type="button" onClick={() => toggleEdit("country")}>{!editForm.country ? "Update" : "Cancel"}</button>
                        </div>
                        <br />
                        <div>
                            <label htmlFor="phone">Phone:</label><br />
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                required 
                                minLength={5}
                                disabled={!editForm.phone}
                                value={formData.phone}
                            />
                            <button type="button" onClick={() => toggleEdit("phone")}>{!editForm.phone ? "Update" : "Cancel"}</button>
                        </div>
                        <br />
                        <button type="submit" disabled={Object.values(editForm).every(value => value === false)}>Confirm changes</button>
                    </form>
                </TabPanel>
            </TabContainer>
        </div>
    </>
    );
}

export default Settings;

const TabContainer = styled(Tabs)`
    border: 1px solid black;
    margin: 40px;
    width: 50%;
    padding: 40px;
`