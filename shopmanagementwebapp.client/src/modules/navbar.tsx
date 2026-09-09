import { NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useAuth } from "./authProvider";

function Navbar() {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {     
        auth?.logout();   
        navigate('/login');
    }

    return (
        <NavbarContainer>
            <NavbarNav>
                <NavbarLink to="/">Dashboard</NavbarLink>
                <NavbarLink to="/shop">Shop</NavbarLink>
                {auth?.user && <>
                <NavbarLink to="/orders">Orders</NavbarLink>
                <NavbarLink to="/settings">Settings</NavbarLink>
                {(auth.user.userType === 1 || auth.user.userType === 2) &&
                <NavbarLink to="/users">Users</NavbarLink>
                }
                </> }
                <Spacer />
                {!auth?.user ? <>
                <NavbarLink to="/login">Login</NavbarLink>
                <NavbarLink to="/register">Register</NavbarLink>
                </> :
                <NavbarButton onClick={logout}>Logout</NavbarButton>
                }
            </NavbarNav>
        </NavbarContainer>
    );
}

export default Navbar;

const NavbarContainer = styled.div<{ width?: number }>`
    width: ${props => props.width ?? "100%"};
    border: 1px solid black;
    padding: 5px;
    background-color: #20317a;
    display: flex;
    justify-content: center;
`

const NavbarNav = styled.nav<{ side?: string }>`
    display: flex;
    justify-content: ${props => props.side ?? "center"};
    align-items: ${props => props.side ?? "center"};
    width: 50%;
`

const Spacer = styled.div`
    margin-left: auto;
`

const NavbarItemCss = css`
    padding: 10px 16px;
    text-decoration: none;
    margin: 10px 12px;
    background-color: #5250c2;
    border-radius: 5px;
    font-size: 18px;
    color: white;

    &:hover {
        padding: 12px 18px;
        margin: 8px 10px;
    }
`

const NavbarLink = styled(NavLink)`    
    ${NavbarItemCss}

    &.active {
        background-color: #161658;
    }

    &.pending {

    }

    &.transitioning {
        
    }
`

const NavbarButton = styled.button`
    ${NavbarItemCss}
`