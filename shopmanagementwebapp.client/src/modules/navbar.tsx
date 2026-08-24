import { NavLink } from "react-router-dom";
import styled from "styled-components";

function Navbar() {

    return (
        <NavbarContainer>
            <NavbarNav>
                <NavbarLink to="/">Dashboard</NavbarLink>
                <NavbarLink to="/products">Products</NavbarLink>
                <NavbarLink to="/orders">Orders</NavbarLink>
                <NavbarLink to="/login">Login</NavbarLink>
            </NavbarNav>
        </NavbarContainer>
    );
}

export default Navbar;

const NavbarContainer = styled.div`
    width: 100%;
    top: 10%;
    left: 50%;
`

const NavbarNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const NavbarLink = styled(NavLink)`
    color: red;
`