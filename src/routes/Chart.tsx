import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

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
function Chart() {
  const coinId = useOutletContext();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(`${coinId}`)
  );
  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              // mode: "dark",
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
              theme: "dark",
            },
          }}
        />
      )}
    </>
  );
}

export default Chart;
