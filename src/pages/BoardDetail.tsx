import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import type { Post } from "../types/Post.ts";
import { BackLink, Message, PageContainer } from "../styles/commonStyle.ts";

const Title = styled.h1`
    margin-bottom: 20px;
    font-size: 2rem;
    font-weight: 800;
`;

const Meta = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.border};
    color: ${props => props.theme.subText};
`;

const Body = styled.div`
    font-size: 1.1rem;
    line-height: 1.8;
    white-space: pre-wrap;
`;

function BoardDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("게시글을 찾을 수 없습니다.");
                return res.json();
            })
            .then((json: Post) => setPost(json))
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
        return <Message>본문을 불러오는 중입니다...</Message>;
    }

    if (!post) {
        return <Message>존재하지 않는 게시글입니다.</Message>;
    }

    return (
        <PageContainer>
            <BackLink to="/board">&larr; 목록으로 돌아가기</BackLink>
            <article>
                <Title>{post.title}</Title>
                <Meta>
                    <span>게시물 번호 : {post.id}</span>
                    <span>작성자 : {post.userId}</span>
                </Meta>
                <Body>{post.body}</Body>
            </article>
        </PageContainer>
    );
}

export default BoardDetail;
