import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "./authProvider";

function Navbar() {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        auth?.setUser(null);
        navigate('/login');
    }

    return (
        <NavbarContainer>
            <NavbarNav>
                <NavbarLink to="/">Dashboard</NavbarLink>
                <NavbarLink to="/products">Products</NavbarLink>
                {auth?.user &&
                <NavbarLink to="/orders">Orders</NavbarLink>
                }
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

const NavbarLink = styled(NavLink)`    
    padding: 10px 16px 10px 16px;
    text-decoration: none;
    border: 1px black white;
    margin: 10px 10px 10px 10px;
    background-color: #5250c2;
    border-radius: 5px;
    font-size: 18px;

    &.active {
        
    }

    &:hover {
        
    }

    &.pending {

    }

    &.transitioning {
        
    }
`

const NavbarButton = styled.button`
    padding: 10px 16px 10px 16px;
    text-decoration: none;
    border: 1px black white;
    margin: 10px 10px 10px 10px;
    background-color: #5250c2;
    border-radius: 5px;
    font-size: 18px;

    &:hover {
        
    }
`