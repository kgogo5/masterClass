import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTickersInfo } from "../api";
interface ICoin {
  coinId: string;
}

interface ITickersInfo {
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
const Wrap = styled.ul`
  margin: 0;
  padding: 0;
`;

const List = styled.li<{ isPositive?: boolean }>`
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  & span {
    color: ${(props) =>
      props.isPositive === true
        ? "rgb(67, 134, 249)"
        : props.isPositive === false
        ? "rgb(247, 84, 103)"
        : props.theme.textColor};
  }
  & + li {
    margin-top: 1em;
  }
`;

const _ = ({ coinId }: ICoin) => {
  const { isLoading, data } = useQuery<ITickersInfo>(
    ["price", coinId],
    () => fetchTickersInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const isPositive = (num: number) => num >= 0;
  return (
    <>
      {!isLoading ? (
        <>
          <Wrap>
            <List>
              <strong>Price</strong>
              <span>${data?.quotes.USD.ath_price}</span>
            </List>
            <List
              isPositive={isPositive(
                Number(data?.quotes.USD.percent_change_15m)
              )}
            >
              <strong>15 Minute</strong>
              <span>{Number(data?.quotes.USD.percent_change_15m)}%</span>
            </List>
            <List
              isPositive={isPositive(
                Number(data?.quotes.USD.percent_change_1h)
              )}
            >
              <strong>1 Hour</strong>
              <span>{Number(data?.quotes.USD.percent_change_1h)}%</span>
            </List>
            <List
              isPositive={isPositive(
                Number(data?.quotes.USD.percent_change_12h)
              )}
            >
              <strong>12 Hour</strong>
              <span>{Number(data?.quotes.USD.percent_change_12h)}%</span>
            </List>
            <List
              isPositive={isPositive(
                Number(data?.quotes.USD.percent_change_24h)
              )}
            >
              <strong>1 Day</strong>
              <span>{Number(data?.quotes.USD.percent_change_24h)}%</span>
            </List>
            <List
              isPositive={isPositive(
                Number(data?.quotes.USD.percent_change_30d)
              )}
            >
              <strong>1 Month</strong>
              <span>{Number(data?.quotes.USD.percent_change_30d)}%</span>
            </List>
          </Wrap>
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default _;
