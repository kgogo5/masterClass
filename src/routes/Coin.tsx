import {
  Link,
  Routes,
  useMatch,
  Route,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";

import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loading = styled.div`
  text-align: center;
`;

const MainInfo = styled.div`
  margin-top: 2em;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  & > div {
    min-width: 12%;
  }

  & strong {
    display: block;
    text-transform: uppercase;
    font-size: 10px;
  }
  & span {
    margin-top: 1em;
    display: block;
  }
`;

const Description = styled.p`
  margin-top: 2em;
  line-height: 1.6;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 2em 0;
  gap: 1em;
`;

const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  & a {
    padding: 1em 0;
    display: block;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
    font-size: 12px;
  }
`;

interface InfoInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
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

interface PriceDataInterface {
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
      ath_date: number;
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

const BackButton = styled.button`
  position: absolute;
  left: 1em;
  top: 1em;
  width: 30px;
  height: 30px;
  font-size: 24px;
  background: none;
  font-weight: bold;
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const _ = () => {
  const navigate = useNavigate();
  const { coinParams }: any = useParams();
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  let coinId = coinParams;
  if (coinParams.indexOf("/crypto") <= 1) {
    const paramIndex = coinParams.indexOf("/crypto");
    coinId = coinParams.slice(paramIndex);
  } else {
    coinId = coinParams;
  }

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoInterface>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<PriceDataInterface>(
      ["tickers", coinId],
      () => fetchCoinTickers(coinId),
      {
        refetchInterval: 5000,
      }
    );

  const loading = infoLoading || tickersLoading;

  return (
    <>
      <Container>
        <BackButton onClick={() => navigate("/")}>&#60;</BackButton>
        <Helmet>
          <title>
            코인{" "}
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
        <Header>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
        </Header>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <MainInfo>
              <div>
                <strong>RANK:</strong>
                <span>{tickersData?.rank}</span>
              </div>
              <div>
                <strong>SYMBOL:</strong>
                <span>{tickersData?.symbol}</span>
              </div>
              <div>
                <strong>Price:</strong>
                <span>{tickersData?.quotes.USD.price}</span>
              </div>
            </MainInfo>
            <Description>{infoData?.description}</Description>
            <MainInfo>
              <div>
                <strong>TOTAL SUPLY:</strong>
                <span>{tickersData?.total_supply}</span>
              </div>
              <div>
                <strong>MAX SUPPLY:</strong>
                <span>{tickersData?.max_supply}</span>
              </div>
            </MainInfo>
            <Tabs>
              <Tab isActive={chartMatch !== null}>
                <Link to="chart">Chart</Link>
              </Tab>
              <Tab isActive={priceMatch !== null}>
                <Link to="price">Price</Link>
              </Tab>
            </Tabs>

            <Routes>
              <Route path={`chart`} element={<Chart coinId={coinId} />} />
              <Route path={`price`} element={<Price coinId={coinId} />} />
            </Routes>
          </>
        )}
      </Container>
    </>
  );
};

export default _;
