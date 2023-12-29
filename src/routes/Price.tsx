import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const PriceWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 18px 0;
  li {
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 16px;
    p::after {
      content: ":";
      padding: 0 6px;
    }
  }
`;

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

interface Params {
  coinId: string;
}

const filterPriceDate = (priceData: PriceData, interval: string) => {
  const now = new Date(priceData?.last_updated).getTime();

  switch (interval) {
    case "15m":
      return priceData.quotes.USD.percent_change_15m
        ? priceData.quotes.USD.price /
            (1 + priceData.quotes.USD.percent_change_15m / 100)
        : null;
    case "1h":
      return priceData.quotes.USD.percent_change_1h
        ? priceData.quotes.USD.price /
            (1 + priceData.quotes.USD.percent_change_1h / 100)
        : null;
    case "7d":
      return priceData.quotes.USD.percent_change_7d
        ? priceData.quotes.USD.price /
            (1 + priceData.quotes.USD.percent_change_7d / 100)
        : null;
    case "1m":
      return priceData.quotes.USD.percent_change_30d
        ? priceData.quotes.USD.price /
            (1 + priceData.quotes.USD.percent_change_30d / 100)
        : null;
    default:
      return null;
  }
};

function PriceBox({ priceData }: { priceData?: PriceData }) {
  if (!priceData) {
    return <div>Loading...</div>;
  }
  return (
    <PriceWrap>
      <li>
        <p>15 min ago</p>
        <span>{filterPriceDate(priceData, "15m") ?? "N/A"}</span>
      </li>
      <li>
        <p>1 hours ago</p>
        <span>{filterPriceDate(priceData, "1h") ?? "N/A"}</span>
      </li>
      <li>
        <p>7 days ago</p>
        <span>{filterPriceDate(priceData, "7d") ?? "N/A"}</span>
      </li>
      <li>
        <p>30 days ago</p>
        <span>{filterPriceDate(priceData, "1m") ?? "N/A"}</span>
      </li>
    </PriceWrap>
  );
}

function Price() {
  const { coinId } = useParams<keyof Params>();
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = tickersLoading;
  return (
    <>
      {loading ? (
        "Loading chart..."
      ) : (
        <>
          <PriceBox priceData={tickersData} />
        </>
      )}
    </>
  );
}
export default Price;
