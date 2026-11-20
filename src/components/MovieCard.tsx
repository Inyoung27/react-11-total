import { Link } from "react-router";
import styled from "styled-components";
import type { MovieSummary } from "../types/Movie.ts";

const StyledLink = styled(Link)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 200px;
    padding: 10px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;

    img {
        width: 100%;
        aspect-ratio: 2 / 3;
        object-fit: cover;
        border-radius: 8px;
    }

    &:hover {
        transform: scale(1.05);
        border-color: ${props => props.theme.primary};
    }
`;

const NoPoster = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.subText};
    font-size: 0.85rem;
`;

const Title = styled.h3`
    font-size: 0.95rem;
`;

const Year = styled.span`
    font-size: 0.8rem;
    color: ${props => props.theme.subText};
`;

type MovieCardProps = {
    movie: MovieSummary;
};

function MovieCard({ movie }: MovieCardProps) {
    return (
        <StyledLink to={`/movie/detail/${movie.imdbID}`}>
            {movie.Poster !== "N/A" ? (
                <img src={movie.Poster} alt={movie.Title} />
            ) : (
                <NoPoster>No Poster</NoPoster>
            )}
            <Title>{movie.Title}</Title>
            <Year>{movie.Year}</Year>
        </StyledLink>
    );
}

export default MovieCard;
