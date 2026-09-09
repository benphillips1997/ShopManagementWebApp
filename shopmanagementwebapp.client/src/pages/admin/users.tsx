import { useEffect, useState } from "react";
import Navbar from "../../modules/navbar";
import { api } from "../../api/client";
import type { User } from "../../api/interfaces";
import Loader from "../../modules/loader";
import styled from "styled-components";
import { getEnumName, UserType } from "../../enums";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        setLoading(true);

        api.GET("/api/User/GetUsers").then(response => {
            if (!response.error && response.data) {
                setUsers(response.data);
            }
            else {
                throw Error("Error loading users");
            }
        }).catch(error => {
            console.log(error);
        }).finally(() => setLoading(false))
    };

    return (
    <>
        <Navbar />
        <div className="center">
            {!loading ? 
                <UserContainer className="center">
                    {users.length > 0 ? users.map(user => 
                        <UserItem key={user.id} className="center-column">
                            <p>{user.firstName} {user.lastName}</p>
                            <p>{user.email}</p>
                            <p>{getEnumName(UserType, user.userType).charAt(0).toUpperCase() + getEnumName(UserType, user.userType).slice(1)}</p>
                            <Link to={`/user/${user.id}`}>Manage user</Link>
                        </UserItem>
                    ) : <p>No users found</p>}
                </UserContainer>
            : <Loader />}
        </div>
    </>
    );
}

export default Users;

const UserContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 40px;
    width: 40%;
    padding: 20px;
`

const UserItem = styled.div`
    border: 1px solid black;
    padding: 20px;
`