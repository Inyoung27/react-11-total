import { useNavigate } from "react-router";
import SearchBar from "../components/SearchBar.tsx";
import { PageContainer, PageTitle } from "../styles/commonStyle.ts";

function Movie() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <PageTitle>Movie Search</PageTitle>
            <SearchBar
                keyword=""
                placeholder="영화 제목을 영어로 검색하세요"
                onSearch={value => navigate(`/movie/search?keyword=${encodeURIComponent(value)}`)}
            />
        </PageContainer>
    );
}

export default Movie;
