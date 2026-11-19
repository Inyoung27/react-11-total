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
    FaSun,
} from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router";
import type { ReactNode } from "react";
import { useThemeMode } from "../context/ThemeModeContext.tsx";

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
    background-color: ${props => props.theme.card};
    border-bottom: 1px solid ${props => props.theme.border};
`;

const Logo = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.4rem;
    font-weight: 800;
    color: ${props => props.theme.text};

    svg {
        color: ${props => props.theme.primary};
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
    color: ${props => props.theme.subText};
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.hoverBg};
    }

    &.active {
        background-color: ${props => props.theme.activeBg};
        color: ${props => props.theme.primary};
    }
`;

const ThemeButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 999px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    font-weight: 600;
    cursor: pointer;

    svg {
        color: #f59e0b;
    }
`;

function Header() {
    const { mode, toggleTheme } = useThemeMode();

    return (
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
            <ThemeButton onClick={toggleTheme}>
                {mode === "dark" ? <FaSun /> : <FaMoon />}
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
            </ThemeButton>
        </Wrap>
    );
}

export default Header;