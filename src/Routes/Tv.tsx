import { useQuery } from "react-query";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import styled from "styled-components";
import {
  getTvAiringToday,
  getTvPopular,
  getTvTopRated,
  getMovies,
} from "../api";
import { makeImagePath } from "../utils";
import {
  Banner,
  Title,
  Overview,
  Slider,
  Row,
  Box,
  Info,
  Overlay,
  BigMovie,
  BigCover,
  BigTitle,
  BigOverview,
} from "./Home";
import { useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";

const Section = styled.div`
  position: relative;
  margin: 2em 1em;
  height: 200px;
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 80px 1em 120px;

  & h1 {
    font-size: 32px;
    font-weight: 500;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  border: 0;
  border-radius: 3px;
  background: #ff000099;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #bb4242;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const offset = 6;

function Tv() {
  const { data: latest, isLoading: latestLoading } = useQuery(
    ["tv", "latest"],
    getMovies
  );
  const { data: today, isLoading: todayLoading } = useQuery(
    ["tv", "today"],
    getTvAiringToday
  );
  const { data, isLoading } = useQuery(["tv", "default"], getTvPopular);
  const { data: topRated, isLoading: topRatedLoading } = useQuery(
    ["tv", "topRate"],
    getTvTopRated
  );
  console.log(data);
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/tv/:tvId");
  const { scrollY } = useViewportScroll();
  const [index, setIndex] = useState(0);
  const [todayState, setTodayState] = useState(0);
  const [topRatedState, setTopRatedState] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = (items: any, type?: string) => {
    if (items) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = items.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (type === "topRated") {
        setTopRatedState((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else if (type === "today") {
        setTodayState((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else {
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      }
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: string) => {
    navigate(`/tv/${tvId}`);
  };
  const onOverlayClick = () => navigate("/tv");
  const clickedMovie =
    bigMovieMatch?.params.tvId &&
    data?.results.find(
      (movie: any) => movie.id === +String(bigMovieMatch.params.tvId)
    );
  const clickedTopReated =
    bigMovieMatch?.params.tvId &&
    topRated?.results.find(
      (movie: any) => movie.id === +String(bigMovieMatch.params.tvId)
    );
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgPhoto={makeImagePath(latest.results[1]?.backdrop_path || "")}
          >
            <Title>{latest?.results[1].title}</Title>
            <Overview>{latest?.results[1].overview}</Overview>
          </Banner>

          <Section>
            <TitleArea>
              <h1>Airing Today</h1>
              <Button onClick={() => incraseIndex(today, "today")}>NEXT</Button>
            </TitleArea>

            <Slider>
              {/* onExitComplete는 애니메이션이 끝났을때 콜백 함수 호출 */}
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={todayState}
                >
                  {today?.results
                    .slice(1)
                    .slice(offset * todayState, offset * todayState + offset)
                    .map((tv: any) => (
                      <Box
                        layoutId={tv.id + "today"}
                        key={tv.id}
                        bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                      >
                        <Info variants={infoVariants}>
                          <h4>{tv.name}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </Section>

          <Section>
            <TitleArea>
              <h1>Popular</h1>
              <Button onClick={() => incraseIndex(data)}>NEXT</Button>
            </TitleArea>

            <Slider>
              {/* onExitComplete는 애니메이션이 끝났을때 콜백 함수 호출 */}
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {data?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((tv: any) => (
                      <Box
                        layoutId={tv.id + "popular"}
                        key={tv.id}
                        bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(tv.id + "")}
                      >
                        <Info variants={infoVariants}>
                          <h4>{tv.name}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <BigMovie
                    style={{ top: scrollY.get() + 100 }}
                    layoutId={bigMovieMatch.params.tvId + "popular"}
                  >
                    {clickedMovie && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedMovie.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        >
                          <BigTitle>{clickedMovie.title}</BigTitle>
                        </BigCover>

                        <BigOverview>{clickedMovie.overview}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          </Section>

          <Section>
            <TitleArea>
              <h1>Top Rated</h1>
              <Button onClick={() => incraseIndex(topRated, "topRated")}>
                NEXT
              </Button>
            </TitleArea>

            <Slider>
              {/* onExitComplete는 애니메이션이 끝났을때 콜백 함수 호출 */}
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={topRatedState}
                >
                  {topRated?.results
                    .slice(1)
                    .slice(
                      offset * topRatedState,
                      offset * topRatedState + offset
                    )
                    .map((tv: any) => (
                      <Box
                        layoutId={tv.id + "topRated"}
                        key={tv.id}
                        bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                        variants={boxVariants}
                        whileHover="hover"
                        initial="normal"
                        transition={{ type: "tween" }}
                        onClick={() => onBoxClicked(tv.id + "")}
                      >
                        <Info variants={infoVariants}>
                          <h4>{tv.name}</h4>
                        </Info>
                      </Box>
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <BigMovie
                    style={{ top: scrollY.get() + 100 }}
                    layoutId={bigMovieMatch.params.tvId + "topRated"}
                  >
                    {clickedTopReated && (
                      <>
                        <BigCover
                          style={{
                            backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                              clickedTopReated.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        >
                          <BigTitle>{clickedTopReated.title}</BigTitle>
                        </BigCover>

                        <BigOverview>{clickedTopReated.overview}</BigOverview>
                      </>
                    )}
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          </Section>
          <Section />
        </>
      )}
    </>
  );
}
export default Tv;
