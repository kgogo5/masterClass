import { useQuery } from "react-query";
import { fetchCoinOhlcv } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  close: string;
  high: string;
  low: number;
  market_cap: number;
  open: number;
  time_close: number;
  time_open: number;
  volume: number;
}

const _ = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["chart", coinId],
    () => fetchCoinOhlcv(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const state = data?.map((price) => {
    const x = String(price.time_close).slice(5, 10);
    const y = [
      price.open.toFixed(2),
      Number(price.high).toFixed(2),
      price.low.toFixed(2),
      Number(price.close).toFixed(2),
    ];
    return { x: x, y: y };
  });

  return (
    <>
      {!isLoading ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: state,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "rgba(0,0,0,.3)",
            },
            grid: {
              show: false,
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              axisBorder: { show: false },
              type: "datetime",
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default _;
