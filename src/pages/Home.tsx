import type { ReactNode } from "react";
import {
    FaBitcoin,
    FaBook,
    FaCheckSquare,
    FaClipboardList,
    FaFilm,
    FaShoppingBag,
} from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router";

type Project = {
    path: string;
    title: string;
    desc: string;
    icon: ReactNode;
};

const PROJECTS: Project[] = [
    {
        path: "/todo",
        title: "투두리스트",
        desc: "체계적인 일정 관리와 할 일 목록 기록",
        icon: <FaCheckSquare />,
    },
    {
        path: "/coin",
        title: "코인트래커",
        desc: "실시간 가상화폐 시세 확인 및 정보 트래킹",
        icon: <FaBitcoin />,
    },
    {
        path: "/board",
        title: "게시판",
        desc: "기본적인 커뮤니티 게시판",
        icon: <FaClipboardList />,
    },
    {
        path: "/product",
        title: "상품목록",
        desc: "상품 데이터를 불러와 보여주는 쇼핑 목록",
        icon: <FaShoppingBag />,
    },
    {
        path: "/book",
        title: "구글북스 검색앱",
        desc: "구글 도서 데이터를 활용한 온라인 책 검색",
        icon: <FaBook />,
    },
    {
        path: "/movie",
        title: "무비검색앱",
        desc: "영화 데이터베이스 API를 활용한 영화 검색",
        icon: <FaFilm />,
    },
];

const Container = styled.div`
    padding: 40px;
`;

const Hero = styled.section`
    padding: 40px;
    margin-bottom: 32px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 20px;
`;

const HeroTitle = styled.h1`
    margin-bottom: 12px;
    font-size: 2rem;
    font-weight: 800;
    color: ${props => props.theme.primary};
`;

const HeroDesc = styled.p`
    font-size: 0.9rem;
    color: ${props => props.theme.subText};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 40px 20px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 20px;
    text-align: center;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-4px);
        border-color: ${props => props.theme.primary};
    }
`;

const IconWrap = styled.div`
    font-size: 2.4rem;
    color: ${props => props.theme.primary};
`;

const CardTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 700;
`;

const CardDesc = styled.p`
    font-size: 0.8rem;
    color: ${props => props.theme.subText};
`;

function Home () {
  return(
    <Container>
      <Hero>
          <HeroTitle>My Project Dashboard</HeroTitle>
          <HeroDesc>지금까지 구축한 포트폴리오 리스트입니다.</HeroDesc>
      </Hero>
        <Grid>
            {PROJECTS.map(project => (
                <Card key={project.path} to={project.path}>
                    <IconWrap>{project.icon}</IconWrap>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDesc>{project.desc}</CardDesc>
                </Card>
            ))}
        </Grid>
    </Container>
  )
}

export default Home;