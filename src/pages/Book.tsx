import { useNavigate } from "react-router";
import SearchBar from "../components/SearchBar.tsx";
import { PageContainer, PageTitle } from "../styles/commonStyle.ts";

function Book() {
    const navigate = useNavigate();

    return (
        <PageContainer>
            <PageTitle>Google Books 검색</PageTitle>
            <SearchBar
                keyword=""
                placeholder="책 제목이나 저자를 검색하세요"
                onSearch={value => navigate(`/book/search?keyword=${encodeURIComponent(value)}`)}
            />
        </PageContainer>
    );
}

export default Book;
