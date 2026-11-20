import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import styled from "styled-components";
import type { BookItem } from "../types/Book.ts";
import { GOOGLE_API_KEY } from "../config.ts";
import SearchBar from "../components/SearchBar.tsx";
import { Message, PageContainer } from "../styles/commonStyle.ts";

type ApiResponse = {
    items?: BookItem[];
};

const Heading = styled.h3`
    margin-bottom: 20px;
    color: ${props => props.theme.subText};
`;

const BookRow = styled(Link)`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px;
    margin-bottom: 10px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 10px;
    transition: all 0.2s;

    &:hover {
        background-color: ${props => props.theme.hoverBg};
        border-color: ${props => props.theme.primary};
    }
`;

const Cover = styled.img`
    width: 60px;
    height: 90px;
    object-fit: cover;
    border-radius: 4px;
`;

const NoCover = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 90px;
    border-radius: 4px;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.subText};
    font-size: 11px;
`;

const Title = styled.div`
    margin-bottom: 4px;
    font-weight: 600;
`;

const Authors = styled.div`
    font-size: 12px;
    color: ${props => props.theme.subText};
`;

function BookSearch() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") ?? "";

    const [list, setList] = useState<BookItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!keyword) return;

        let ignore = false;
        setLoading(true);

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(keyword)}&maxResults=20&key=${GOOGLE_API_KEY}`,
        )
            .then(res => res.json())
            .then((json: ApiResponse) => {
                if (!ignore) setList(json.items ?? []);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            })
            .finally(() => {
                if (!ignore) setLoading(false);
            });

        // 검색어가 빠르게 바뀌면 이전 요청의 결과는 무시
        return () => {
            ignore = true;
        };
    }, [keyword]);

    return (
        <PageContainer>
            <Heading>검색 결과 : {keyword}</Heading>
            <SearchBar
                key={keyword}
                keyword={keyword}
                placeholder="책 제목이나 저자를 검색하세요"
                onSearch={value => navigate(`/book/search?keyword=${encodeURIComponent(value)}`)}
            />

            {loading ? (
                <Message>로딩 중입니다...</Message>
            ) : list.length === 0 ? (
                <Message>검색 결과가 없습니다.</Message>
            ) : (
                list.map(item => (
                    <BookRow key={item.id} to={`/book/detail/${item.id}`}>
                        {item.volumeInfo.imageLinks ? (
                            <Cover
                                src={item.volumeInfo.imageLinks.thumbnail.replace(
                                    "http://",
                                    "https://",
                                )}
                                alt={item.volumeInfo.title}
                            />
                        ) : (
                            <NoCover>No Cover</NoCover>
                        )}
                        <div>
                            <Title>{item.volumeInfo.title}</Title>
                            <Authors>{item.volumeInfo.authors?.join(", ")}</Authors>
                        </div>
                    </BookRow>
                ))
            )}
        </PageContainer>
    );
}

export default BookSearch;
