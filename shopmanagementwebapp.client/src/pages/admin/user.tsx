import { useEffect, useState } from "react";
import Navbar from "../../modules/navbar";
import { type User as UserModel } from "../../api/interfaces";
import { useParams } from "react-router-dom";
import { api } from "../../api/client";
import Loader from "../../modules/loader";
import { getEnumName, UserType } from "../../enums";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = () => {
        if (!userId) {
            setUser(undefined);
            return;
        }

        setLoading(true);

        api.GET("/api/User/GetUser/{userId}", { params: { path: { userId: userId }}}).then(response => {
            if (!response.error && response.data) {
                setUser(response.data);
            }
            else {
                throw Error("Error retrieving user");
            }
        }).catch(error => {
            console.error(error);
        }).finally(() => setLoading(false))
    }

    return (
    <>
        <Navbar />
        <div className="center">
            {!loading ? <>
                {user ? 
                    <div className="center-column">
                        <p>{user.email}</p>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.address}, {user.country}</p>
                        <p>{getEnumName(UserType, user.userType).charAt(0).toUpperCase() + getEnumName(UserType, user.userType).slice(1)}</p>
                    </div>
                : <h1>Could not retrieve user</h1>}
            </> : <Loader />}
        </div>
    </>
    )
}

export default User;