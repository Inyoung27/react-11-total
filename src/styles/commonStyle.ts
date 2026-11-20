import styled from "styled-components";
import { Link } from "react-router";

export const PageContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
`;

export const PageTitle = styled.h1`
    margin-bottom: 24px;
    font-size: 1.8rem;
    font-weight: 800;
    color: ${props => props.theme.primary};
`;

export const Message = styled.div`
    padding: 100px 20px;
    text-align: center;
    color: ${props => props.theme.subText};
`;

export const BackLink = styled(Link)`
    display: inline-block;
    margin-bottom: 24px;
    padding: 8px 14px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 8px;
    background-color: ${props => props.theme.card};
    font-size: 0.9rem;
    color: ${props => props.theme.subText};
    transition: all 0.2s;

    &:hover {
        color: ${props => props.theme.primary};
        border-color: ${props => props.theme.primary};
    }
`;
