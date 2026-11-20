import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import type { Product } from "../types/Product.ts";
import { BackLink, Message, PageContainer } from "../styles/commonStyle.ts";

const Content = styled.div`
    display: flex;
    gap: 40px;
    padding: 30px;
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 20px;

    @media (max-width: 700px) {
        flex-direction: column;
    }
`;

const Image = styled.img`
    width: 320px;
    max-width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 14px;
    background-color: ${props => props.theme.background};
`;

const Info = styled.div`
    flex: 1;
`;

const Title = styled.h1`
    margin-bottom: 14px;
    font-size: 1.8rem;
`;

const Description = styled.p`
    margin-bottom: 20px;
    line-height: 1.7;
    color: ${props => props.theme.subText};
`;

const Meta = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Badge = styled.span`
    padding: 4px 12px;
    border-radius: 999px;
    background-color: ${props => props.theme.activeBg};
    font-size: 0.85rem;
    color: ${props => props.theme.primary};
`;

const Price = styled.li`
    font-size: 1.5rem;
    font-weight: 800;
    color: ${props => props.theme.primary};
`;

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("상품을 찾을 수 없습니다.");
                return res.json();
            })
            .then((json: Product) => setProduct(json))
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
        return <Message>LOADING...</Message>;
    }

    if (!product) {
        return <Message>상품을 찾을 수 없습니다.</Message>;
    }

    return (
        <PageContainer>
            <BackLink to="/product">&larr; 목록으로</BackLink>
            <Content>
                <Image src={product.thumbnail} alt={product.title} />
                <Info>
                    <Title>{product.title}</Title>
                    <Description>{product.description}</Description>
                    <Meta>
                        <li>
                            <Badge>{product.category}</Badge>
                        </li>
                        <li>평점: {product.rating}</li>
                        <Price>$ {product.price}</Price>
                    </Meta>
                </Info>
            </Content>
        </PageContainer>
    );
}

export default ProductDetail;
