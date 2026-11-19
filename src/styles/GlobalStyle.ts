import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        background-color: ${props => props.theme.background};
        color: ${props => props.theme.text};
        transition: background-color 0.3s, color 0.3s;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
    
    ul {
        list-style: none;
    }
`;

export default GlobalStyle;