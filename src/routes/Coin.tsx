import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 100px 20px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  h2 {
    padding-left: 8px;
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    text-transform: capitalize;
  }
`;

const Loader = styled.span`
  display: block;
  margin: 0 auto;
  font-size: 30px;
  text-align: center;
`;
const OverViewWrap = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 340px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    p {
      font-size: 12px;
      font-weight: 400;
      text-align: center;
    }
    span {
      padding-top: 12px;
      font-size: 18px;
    }
  }
`;
const Description = styled.p`
  max-width: 600px;
  margin: 0 auto;
  padding: 60px 0;
`;

const OverViewItemWrap = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 340px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.2);
  li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    p {
      font-size: 12px;
      font-weight: 400;
      text-align: center;
    }
    span {
      padding-top: 12px;
      font-size: 18px;
    }
    li {
      &:last-child {
        align-items: flex-end;
      }
    }
  }
`;

const Tabs = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 20px;
`;
const TabBtn = styled.li<{ isActive: boolean }>`
  width: 140px;
  border: 1px solid
    ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  transition: 0.3s;
  &:last-child {
    margin-left: -1px;
    border-left: ${(props) =>
      props.isActive
        ? `1px solid ${props.theme.accentColor}`
        : "1px solid transparent"};
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 12px 10px;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
  &:hover {
    border-color: ${(props) => props.theme.accentColor};
    border-left: 1px solid ${(props) => props.theme.accentColor};
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface Params {
  coinId: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function OverView({
  coinInfo,
  priceInfo,
}: {
  coinInfo: InfoData | undefined;
  priceInfo: PriceData | undefined;
}) {
  return (
    <OverViewWrap>
      <li>
        <p>RANK</p>
        <span>{coinInfo?.rank}</span>
      </li>
      <li>
        <p>SYMBOL</p>
        <span>{coinInfo?.symbol}</span>
      </li>
      <li>
        <p>Price</p>
        <span>{priceInfo?.quotes?.USD.price.toFixed(3)}</span>
      </li>
    </OverViewWrap>
  );
}

function OverViewItem({ priceInfo }: { priceInfo: PriceData | undefined }) {
  return (
    <OverViewItemWrap>
      <li>
        <p>TOTAL SUPLY</p>
        <span>{priceInfo?.total_supply}</span>
      </li>
      <li>
        <p>MAX SUPPLY</p>
        <span>{priceInfo?.max_supply}</span>
      </li>
    </OverViewItemWrap>
  );
}

function Tab() {
  const { coinId } = useParams<keyof Params>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  return (
    <Tabs>
      <TabBtn isActive={chartMatch !== null}>
        <Link to={`/${coinId}/chart`}>Chart</Link>
      </TabBtn>
      <TabBtn isActive={priceMatch !== null}>
        <Link to={`/${coinId}/price`}>Price</Link>
      </TabBtn>
    </Tabs>
  );
}

function Coin() {
  const { coinId } = useParams<keyof Params>();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  // const [loading, setLoading] = useState(true);
  // const [coinInfo, setCoinInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setCoinInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>cocoIn-{coinId?.slice(4)}</title>
      </Helmet>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Wrap>
          <h2>{coinId?.slice(4)}</h2>
          <OverView coinInfo={infoData} priceInfo={tickersData} />
          <Description>{infoData?.description}</Description>
          <OverViewItem priceInfo={tickersData} />
          <Tab />
          <Outlet context={coinId} />
        </Wrap>
      )}
    </Container>
  );
}

export default Coin;
