import {
    FaBitcoin,
    FaBook,
    FaCheckSquare,
    FaClipboardList,
    FaFilm,
    FaHome,
    FaMoon,
    FaRocket,
    FaShoppingBag,
} from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router";
import type { ReactNode } from "react";

type MenuItem = {
    path: string;
    label: string;
    icon: ReactNode;
}

const MENUS: MenuItem[] = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/todo", label: "Todo", icon: <FaCheckSquare /> },
    { path: "/coin", label: "Coin", icon: <FaBitcoin /> },
    { path: "/board", label: "Board", icon: <FaClipboardList /> },
    { path: "/product", label: "Product", icon: <FaShoppingBag /> },
    { path: "/book", label: "Book", icon: <FaBook /> },
    { path: "/movie", label: "Movie", icon: <FaFilm /> },
];

const Wrap = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 40px;
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
`;

const Logo = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.4rem;
    font-weight: 800;
    color: #1f2937;

    svg {
        color: #1a73d9;
    }
`;

const Nav = styled.nav`
    display: flex;
    gap: 8px;
`;

const Menu = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 600;
    color: #6b7280;
    transition: all 0.2s;

    &:hover {
        background-color: #f3f4f6;
    }

    &.active {
        background-color: #eaf3ff;
        color: #1a73d9;
    }
`;

const ThemeButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border: 1px solid #e5e7eb;
    border-radius: 999px;
    background-color: #f9fafb;
    font-weight: 600;
    cursor: pointer;

    svg {
        color: #f59e0b;
    }
`;

function Header() {
    return(
        <Wrap>
            <Logo to={"/"}>
                <FaRocket />
                My Universe
            </Logo>
            <Nav>
                {MENUS.map(menu => (
                    <Menu key={menu.path} to={menu.path} end={menu.path === "/"}>
                        {menu.icon}
                        {menu.label}
                    </Menu>
                ))}
            </Nav>
            <ThemeButton>
                <FaMoon />
                DarkMode
            </ThemeButton>
        </Wrap>
    );
}

export default Header;