import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";

const ChartWrap = styled.div`
  .apexcharts-canvas > svg {
    background-color: transparent !important;
  }
  .apexcharts-tooltip.apexcharts-theme-light {
    background: rgb(193 193 193 / 32%);
  }
`;

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ICoinId {
  coinId: string;
}
interface ICahrtProps {
  isDark: boolean;
}

function Chart({ isDark }: ICahrtProps) {
  const coinId = useOutletContext();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(`${coinId}`)
  );
  return (
    <ChartWrap>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={
            [
              {
                name: "Price",
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      parseFloat(price.open),
                      parseFloat(price.high),
                      parseFloat(price.low),
                      parseFloat(price.close),
                    ],
                  };
                }),
              },
            ] as any
          }
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            stroke: {
              width: 3,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000) ?? [],
            },
            yaxis: {
              show: false,
            },
            colors: ["#ff4152"],
            tooltip: {
              y: {
                formatter: (value) => `${value.toFixed(3)}`,
              },
              fillSeriesColor: true,
              theme: isDark ? "dark" : "light",
            },
          }}
        />
      )}
    </ChartWrap>
  );
}

export default Chart;
