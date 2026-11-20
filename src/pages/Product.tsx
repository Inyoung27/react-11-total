import { useEffect, useState } from "react";
import { Link } from "react-router";
import styled from "styled-components";
import type { Product } from "../types/Product.ts";
import { Message, PageContainer, PageTitle } from "../styles/commonStyle.ts";

type ApiResponse = {
    products: Product[];
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 16px;
    transition: all 0.2s;

    &:hover {
        transform: translateY(-4px);
        border-color: ${props => props.theme.primary};
    }
`;

const Thumbnail = styled.img`
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    background-color: ${props => props.theme.background};
`;

const Info = styled.div`
    padding: 14px 16px 18px;
`;

const Name = styled.h3`
    margin-bottom: 6px;
    font-size: 0.95rem;
`;

const Price = styled.p`
    font-weight: 800;
    color: ${props => props.theme.primary};
`;

function ProductPage() {
    const [list, setList] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=12")
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.products))
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
        return <Message>LOADING...</Message>;
    }

    if (list.length === 0) {
        return <Message>상품을 찾을 수 없거나, 오류가 발생했습니다.</Message>;
    }

    return (
        <PageContainer>
            <PageTitle>상품 목록</PageTitle>
            <Grid>
                {list.map(item => (
                    <Card key={item.id} to={`/product/${item.id}`}>
                        <Thumbnail src={item.thumbnail} alt={item.title} />
                        <Info>
                            <Name>{item.title}</Name>
                            <Price>${item.price}</Price>
                        </Info>
                    </Card>
                ))}
            </Grid>
        </PageContainer>
    );
}

export default ProductPage;
