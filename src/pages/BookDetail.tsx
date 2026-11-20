import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import type { BookItem } from "../types/Book.ts";
import { GOOGLE_API_KEY } from "../config.ts";
import {
    BackButton,
    DetailContent,
    DetailImage,
    DetailInfo,
    DetailMeta,
    DetailTitle,
    Message,
    DetailNoImage,
    PageContainer,
} from "../styles/commonStyle.ts";

const Description = styled.div`
    line-height: 1.8;
`;

function BookDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [book, setBook] = useState<BookItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${GOOGLE_API_KEY}`)
            .then(res => {
                if (!res.ok) throw new Error("책을 찾을 수 없습니다.");
                return res.json();
            })
            .then((json: BookItem) => setBook(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <Message>Loading...</Message>;
    }

    if (!book) {
        return <Message>책 정보를 찾을 수 없습니다.</Message>;
    }

    const info = book.volumeInfo;

    return (
        <PageContainer>
            <BackButton onClick={() => navigate(-1)}>&larr; 뒤로 가기</BackButton>
            <DetailContent>
                {info.imageLinks ? (
                    <DetailImage
                        src={info.imageLinks.thumbnail.replace("http://", "https://")}
                        alt={info.title}
                    />
                ) : (
                    <DetailNoImage>No Cover</DetailNoImage>
                )}
                <DetailInfo>
                    <DetailTitle>{info.title}</DetailTitle>
                    <DetailMeta>
                        <li>저자: {info.authors?.join(", ") ?? "정보 없음"}</li>
                        <li>출판사: {info.publisher ?? "정보 없음"}</li>
                        <li>출간일: {info.publishedDate ?? "정보 없음"}</li>
                    </DetailMeta>
                    <Description dangerouslySetInnerHTML={{ __html: info.description || "" }} />
                </DetailInfo>
            </DetailContent>
        </PageContainer>
    );
}

export default BookDetail;
