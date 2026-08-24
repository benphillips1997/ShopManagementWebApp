import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navBar";

function Dashboard() {
    // const user = useLoaderData();
    const user = useAuth()?.user;
    
    return (
    <>
        <Navbar />
        <div className="core">
            <DashboardContainer>
                <DashboardItem to="/products">
                    <p>Products</p>
                </DashboardItem>
                {user?.userType !== 3 && <>
                    <DashboardItem to="/orders">
                        <p>Orders</p>
                    </DashboardItem>
                </>}
                {user?.userType === 1 && <>
                    <DashboardItem to="/users">
                        <p>Users</p>
                    </DashboardItem>
                </>}                
            </DashboardContainer>
        </div>
    </>
    );
}

export default Dashboard;

const DashboardContainer = styled.div`
    border: 2px solid rgb(75 70 74);
    font: 1.2em sans-serif;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px;
`

const DashboardItem = styled(Link)`
    border: 2px solid rgb(95 97 110);
    padding: 20px;
    width: 10em;
    margin: 10px;
`