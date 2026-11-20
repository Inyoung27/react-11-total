import styled, { css } from "styled-components";
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

const backStyle = css`
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

export const BackLink = styled(Link)`
    ${backStyle}
`;

export const BackButton = styled.button`
    ${backStyle};
    cursor: pointer;
`;

/* ---------- 검색 결과 카드 (Movie 등) ---------- */

export const ResultGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
`;

export const ResultCard = styled(Link)`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 14px;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-4px);
        border-color: ${props => props.theme.primary};
    }
`;

export const Poster = styled.img`
    width: 100%;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    background-color: ${props => props.theme.background};
`;

export const NoPoster = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 2 / 3;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.subText};
    font-size: 0.85rem;
`;

export const CardInfo = styled.div`
    padding: 12px 14px 16px;
`;

export const CardTitle = styled.div`
    margin-bottom: 4px;
    font-size: 0.9rem;
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

export const CardSub = styled.div`
    font-size: 0.78rem;
    color: ${props => props.theme.subText};
`;

/* ---------- 상세 레이아웃 (Book, Movie 공통) ---------- */

export const DetailContent = styled.div`
    display: flex;
    gap: 40px;
    padding: 30px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 20px;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

export const DetailImage = styled.img`
    width: 260px;
    max-width: 100%;
    align-self: flex-start;
    border-radius: 12px;
`;

export const DetailNoImage = styled.div`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    width: 200px;
    max-width: 100%;
    aspect-ratio: 2 / 3;
    border-radius: 12px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.subText};
    font-size: 0.9rem;
`;

export const DetailInfo = styled.div`
    flex: 1;
`;

export const DetailTitle = styled.h1`
    margin-bottom: 16px;
    font-size: 1.8rem;
`;

export const DetailMeta = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
    color: ${props => props.theme.subText};
`;

export const DetailText = styled.p`
    line-height: 1.8;
    white-space: pre-wrap;
`;
