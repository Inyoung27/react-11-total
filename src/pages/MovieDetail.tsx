import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { MovieInfo } from "../types/Movie.ts";
import { OMDB_API_KEY } from "../config.ts";
import {
    BackButton,
    DetailContent,
    DetailImage,
    DetailInfo,
    DetailMeta,
    DetailNoImage,
    DetailText,
    DetailTitle,
    Message,
    PageContainer,
} from "../styles/commonStyle.ts";

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<MovieInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`)
            .then(res => res.json())
            .then((json: MovieInfo) => {
                if (json.Response === "False") {
                    throw new Error(json.Error ?? "영화를 찾을 수 없습니다.");
                }
                setMovie(json);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("알 수 없는 오류가 발생하였습니다. " + err);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Message>Loading...</Message>;
    }

    if (!movie) {
        return <Message>영화 정보를 찾을 수 없습니다.</Message>;
    }

    return (
        <PageContainer>
            <BackButton onClick={() => navigate(-1)}>&larr; Back</BackButton>
            <DetailContent>
                {movie.Poster !== "N/A" ? (
                    <DetailImage src={movie.Poster} alt={movie.Title} />
                ) : (
                    <DetailNoImage>No Poster</DetailNoImage>
                )}
                <DetailInfo>
                    <DetailTitle>{movie.Title}</DetailTitle>
                    <DetailMeta>
                        <li>
                            <strong>Year:</strong> {movie.Year}
                        </li>
                        <li>
                            <strong>Genre:</strong> {movie.Genre}
                        </li>
                        <li>
                            <strong>Director:</strong> {movie.Director}
                        </li>
                        <li>
                            <strong>Actors:</strong> {movie.Actors}
                        </li>
                        <li>
                            <strong>Runtime:</strong> {movie.Runtime}
                        </li>
                        <li>
                            <strong>Rating:</strong> ⭐ {movie.imdbRating}
                        </li>
                    </DetailMeta>
                    <DetailText>{movie.Plot}</DetailText>
                </DetailInfo>
            </DetailContent>
        </PageContainer>
    );
}

export default MovieDetail;
