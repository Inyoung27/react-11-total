import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { Message } from "../styles/commonStyle.ts";

type Coin = {
    id: string;
    symbol: string;
    name: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    market_cap_usd: string;
    volume24: number;
};

type ApiResponse = {
    data: Coin[]
}

const formatPrice = (value: string | number): string => {
    const n = Number(value);
    return n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: n >= 1 ? 2 : 6,
    });
};

const formatBig = (value: string | number): string => {
    return "$" + Math.round(Number(value)).toLocaleString("en-US");
};

const Layout = styled.div`
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 20px;
    padding: 30px 40px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

const Panel = styled.section`
    background-color: ${props => props.theme.card};
    border: 1px solid ${props => props.theme.border};
    border-radius: 20px;
    overflow: hidden;
`;

const ListPanel = styled(Panel)`
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 130px);
`;

const ListTitle = styled.h2`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 20px;
    font-size: 1.1rem;
    border-bottom: 1px solid ${props => props.theme.border};

    svg {
        color: ${props => props.theme.primary};
    }
`;

const List = styled.ul`
    overflow-y: auto;
`;

const CoinItem = styled.li<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    border-bottom: 1px solid ${props => props.theme.border};
    background-color: ${props => (props.$selected ? props.theme.activeBg : "transparent")};
    cursor: pointer;

    &:hover {
        background-color: ${props => props.theme.hoverBg};
    }
`;

const CoinName = styled.div`
    font-weight: 700;
`;

const Symbol = styled.div`
    font-size: 0.75rem;
    color: ${props => props.theme.subText};
`;

const Right = styled.div`
    text-align: right;
    font-weight: 600;
`;

const Change = styled.div<{ $up: boolean }>`
    font-size: 0.75rem;
    color: ${props => (props.$up ? "#2e9e5b" : "#d9534f")};
`;

const DetailPanel = styled(Panel)`
    padding: 40px;
`;

const DetailTitle = styled.h1`
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid ${props => props.theme.border};
    font-size: 2rem;
    color: ${props => props.theme.primary};

    span {
        font-size: 1.1rem;
        font-weight: 500;
        color: ${props => props.theme.subText};
    }
`;

const StatGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
`;

const StatCard = styled.div`
    padding: 20px;
    border-radius: 14px;
    background-color: ${props => props.theme.background};
`;

const StatLabel = styled.div`
    margin-bottom: 8px;
    font-size: 0.8rem;
    color: ${props => props.theme.subText};
`;

const StatValue = styled.div`
    font-size: 1.3rem;
    font-weight: 800;
`;

function CoinPage() {
    const [list, setList] = useState<Coin[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50")
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.data))
            .catch((err:unknown) => {
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

    if (list.length === 0) {
        return <Message>코인 정보를 불러오지 못했어요.</Message>;
    }

    const selected = list.find(coin => coin.id === selectedId) ?? list[0];

  return (
      <Layout>
          <ListPanel>
              <ListTitle>
                  <FaBitcoin />
                  Top 50 Coins
              </ListTitle>
              <List>
                  {list.map(coin => {
                      const change = Number(coin.percent_change_24h);
                      return (
                          <CoinItem
                              key={coin.id}
                              $selected={coin.id === selected.id}
                              onClick={() => setSelectedId(coin.id)}>
                              <div>
                                  <CoinName>{coin.name}</CoinName>
                                  <Symbol>{coin.symbol}</Symbol>
                              </div>
                              <Right>
                                  <div>{formatPrice(coin.price_usd)}</div>
                                  <Change $up={change >= 0}>
                                      {change >= 0 ? "↑" : "↓"}
                                      {Math.abs(change)}%
                                  </Change>
                              </Right>
                          </CoinItem>
                      );
                  })}
              </List>
          </ListPanel>

          <DetailPanel>
              <DetailTitle>
                  {selected.name} <span>{selected.symbol}</span>
              </DetailTitle>
              <StatGrid>
                  <StatCard>
                      <StatLabel>현재 가격 (USD)</StatLabel>
                      <StatValue>{formatPrice(selected.price_usd)}</StatValue>
                  </StatCard>
                  <StatCard>
                      <StatLabel>시가총액</StatLabel>
                      <StatValue>{formatBig(selected.market_cap_usd)}</StatValue>
                  </StatCard>
                  <StatCard>
                      <StatLabel>24시간 거래량</StatLabel>
                      <StatValue>{formatBig(selected.volume24)}</StatValue>
                  </StatCard>
                  <StatCard>
                      <StatLabel>시가총액 순위</StatLabel>
                      <StatValue>{selected.rank}위</StatValue>
                  </StatCard>
              </StatGrid>
          </DetailPanel>
      </Layout>
  );
}

export default CoinPage;
