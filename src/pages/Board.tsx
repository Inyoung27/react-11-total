import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import type { Post } from "../types/Post.ts";
import { Message, PageContainer, PageTitle } from "../styles/commonStyle.ts";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};

    th,
    td {
        padding: 14px;
        border-bottom: 1px solid ${props => props.theme.border};
    }

    th {
        background-color: ${props => props.theme.background};
        font-size: 0.85rem;
        color: ${props => props.theme.subText};
    }
`;

const Row = styled.tr`
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.theme.hoverBg};
    }
`;

const IdCell = styled.td`
    width: 80px;
    text-align: center;
    color: ${props => props.theme.subText};
`;

const UserCell = styled.td`
    width: 100px;
    text-align: center;
    color: ${props => props.theme.subText};
`;

const TitleLink = styled(Link)`
    &:hover {
        color: ${props => props.theme.primary};
    }
`;

function Board() {
    const [list, setList] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then((json: Post[]) => setList(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log(err);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <Message>데이터를 불러오는 중입니다...</Message>;
    }

    return (
        <PageContainer>
            <PageTitle>커뮤니티 게시판</PageTitle>
            <Table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자 ID</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(item => (
                        <Row key={item.id}>
                            <IdCell>{item.id}</IdCell>
                            <td>
                                <TitleLink to={`/board/${item.id}`}>{item.title}</TitleLink>
                            </td>
                            <UserCell>{item.userId}</UserCell>
                        </Row>
                    ))}
                </tbody>
            </Table>
        </PageContainer>
    );
}

export default Board;
