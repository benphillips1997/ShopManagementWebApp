import { useEffect, useState } from "react";
import Navbar from "../../modules/navbar";
import { api } from "../../api/client";
import type { User } from "../../api/interfaces";
import Loader from "../../modules/loader";
import styled from "styled-components";

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
        <div>
            {!loading ? 
                <UserContainer className="center">
                    {users.length > 0 ? users.map(user => 
                        <UserItem key={user.id} className="center-column">
                            <p>{user.firstName} {user.lastName}</p>
                            <p>{user.email}</p>
                            <p>{user.userType}</p>
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
    grid-template-columns: repeat(auto);
    gap: 20px;
`

const UserItem = styled.div`
    border: 1px solid black;
    padding: 20px;
`