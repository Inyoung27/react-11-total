import { Link } from "react-router";
import styled from "styled-components";
import { PageContainer } from "../styles/commonStyle.ts";

const Wrap = styled(PageContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding-top: 100px;
    text-align: center;
`;

const Code = styled.h1`
    font-size: 6rem;
    font-weight: 800;
    color: ${props => props.theme.primary};
`;

const Text = styled.p`
    color: ${props => props.theme.subText};
`;

const HomeLink = styled(Link)`
    margin-top: 12px;
    padding: 12px 24px;
    border-radius: 999px;
    background-color: ${props => props.theme.primary};
    font-weight: 600;
    color: white;
`;

function NotFound() {
    return (
        <Wrap>
            <Code>404</Code>
            <Text>페이지를 찾을 수 없어요. 주소가 잘못되었거나 이동된 페이지예요.</Text>
            <HomeLink to="/">홈으로 돌아가기</HomeLink>
        </Wrap>
    );
}

export default NotFound;
