import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import { getMovieSearch, getTvSearch } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  padding: 80px 1em 2em;
`;

const ListWrap = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  & li {
    min-height: 300px;
  }
`;

const ImgBox = styled.div`
  & img {
    max-width: 100%;
    width: 100%;
    vertical-align: top;
  }
`;

const Title = styled.h1`
  margin: 1em 0.5em;
  display: block;
  font-size: 32px;
  font-weight: bold;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data, isLoading } = useQuery(["movie", "search"], () =>
    getMovieSearch(keyword)
  );
  const { data: tvData, isLoading: tvLoading } = useQuery(
    ["tv", "search"],
    () => getTvSearch(keyword)
  );
  return (
    <Wrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Title>Movie Search</Title>
          <ListWrap>
            {data.results.length >= 1 &&
              data.results.map((item: any) => (
                <li>
                  <ImgBox>
                    <img src={makeImagePath(item.poster_path, "w500")} alt="" />
                  </ImgBox>
                  <div>{item.title}</div>
                </li>
              ))}
          </ListWrap>
          <hr />

          <Title>TV Search</Title>
          <ListWrap>
            {tvData.results.length >= 1 &&
              tvData.results.map((item: any) => (
                <li>
                  <ImgBox>
                    <img src={makeImagePath(item.poster_path, "w500")} alt="" />
                  </ImgBox>
                  <div>{item.title}</div>
                </li>
              ))}
          </ListWrap>
        </>
      )}
    </Wrapper>
  );
}
export default Search;
