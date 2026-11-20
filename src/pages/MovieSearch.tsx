import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import styled from "styled-components";
import type { MovieSummary } from "../types/Movie.ts";
import { OMDB_API_KEY } from "../config.ts";
import SearchBar from "../components/SearchBar.tsx";
import MovieCard from "../components/MovieCard.tsx";
import { Message, PageContainer } from "../styles/commonStyle.ts";

type ApiResponse = {
    Search?: MovieSummary[];
};

const Heading = styled.h3`
    margin-bottom: 20px;
    color: ${props => props.theme.subText};
`;

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
`;

function MovieSearch() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";

    const [list, setList] = useState<MovieSummary[]>([]);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        if (!keyword) return;

        let ignore = false;
        setLoading(true);
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then((json: ApiResponse) => {
                if (!ignore) setList(json.Search ?? []);
            })
            .catch(() => {
                if (!ignore) setError("검색하는데 오류가 발생하였습니다.");
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        return () => {
            ignore = true;
        };
    }, [keyword]);

    return (
        <PageContainer>
            <Heading>검색 키워드 : {keyword}</Heading>
            <SearchBar
                key={keyword}
                keyword={keyword}
                placeholder="영화 제목을 영어로 검색하세요"
                onSearch={value => navigate(`/movie/search?keyword=${encodeURIComponent(value)}`)}
            />

            {loading && <Message>Loading...</Message>}
            {error && <Message>{error}</Message>}

            {!loading && !error && (
                <>
                    {list.length === 0 ? (
                        <Message>검색 결과가 없습니다.</Message>
                    ) : (
                        <List>
                            {list.map(movie => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </List>
                    )}
                </>
            )}
        </PageContainer>
    );
}

export default MovieSearch;
