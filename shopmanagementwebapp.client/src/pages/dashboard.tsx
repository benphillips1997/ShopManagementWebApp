import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "../modules/authProvider";
import Navbar from "../modules/navbar";
import { useEffect, useState } from "react";

function Dashboard() {
    const user = useAuth()?.user;
    const [linkAmount, setLinkAmount] = useState(0);

    useEffect(() => {
        countLinks();
    }, [user])    
    
    const countLinks = () => {
        let numOfLinks = 1;
        if (user) {
            numOfLinks += 2;
        }
        if (user?.userType === 1) {
            numOfLinks += 1;
        }
        setLinkAmount(numOfLinks);
    }
    
    return (
    <>
        <Navbar />
        <div className="center-column">
            <h1 className="center">Logged in as {user ? user?.firstName : "guest"}</h1>
            <DashboardContainer>
                <DashboardItem to="/shop" className="center"><p>Shop</p></DashboardItem>
                {user && <>
                <DashboardItem to="/orders" className="center"><p>Orders</p></DashboardItem>
                <DashboardItem to="/settings" className="center"><p>Settings</p></DashboardItem>                    
                    {user?.userType === 1 && <>
                    <DashboardItem to="/users" className="center"><p>Users</p></DashboardItem>
                    </>}
                </>}
                {Array.from({length: 4 - (linkAmount % 4)},(_,index) => <DashboardItemPlaceholder />)}
            </DashboardContainer>
        </div>
    </>
    );
}

export default Dashboard;

const DashboardContainer = styled.div`
    border: 2px solid rgb(75 70 74);
    font: 1.2em sans-serif;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    margin: 60px;
    width: 50%;
    padding: 50px 50px;
`

const DashboardItemCss = css`
    border: 2px solid rgb(95 97 110);
    padding: 20px;
    margin: 10px;
`

const DashboardItem = styled(Link)`
    ${DashboardItemCss}
`

const DashboardItemPlaceholder = styled.div`
    ${DashboardItemCss}
`