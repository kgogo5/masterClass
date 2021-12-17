import styled, { createGlobalStyle } from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:black;
  line-height: 1.2;
  background:linear-gradient(135deg,rgb(238, 0, 153),rgb(221, 0, 238));
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const Wrapper = styled(motion.div)`
  height: 120vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  /* background-color: rgba(255, 255, 255, 1); */
  border-radius: 20px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
  color: white;
  path {
    stroke: white;
    stroke-width: 2;
    /* fill: currentColor; // currentColor 는 css color의 색상대로 따라 정해짐 */
  }
`;

const _ = () => {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [180, -180]);
  const background = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg,rgb(0, 202, 238),rgb(0, 83, 238))",
      "linear-gradient(135deg,rgb(238, 0, 153),rgb(221, 0, 238))",
      "linear-gradient(135deg,rgb(0, 238, 167),rgb(238, 163, 0))",
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const svg = {
    start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
    end: { pathLength: 0.3, fill: "rgba(255,255,255,1)" },
  };

  useEffect(() => {
    // x.onChange(() => console.log(x.get()));
    rotateZ.onChange(() => console.log(rotateZ.get()));
    scrollYProgress.onChange(() => console.log(scrollYProgress.get()));
  }, [rotateZ, scrollYProgress]);

  return (
    <>
      <GlobalStyle />
      <Wrapper style={{ background }}>
        <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin>
          <Svg
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <motion.path
              variants={svg}
              transition={{
                default: { duration: 3 },
                fill: { duration: 2, delay: 1 },
              }}
              initial={"start"}
              animate={"end"}
              d="M185.2 356.5c7.7-18.5-1-39.7-19.6-47.4l-29.5-12.2c11.4-4.3 24.3-4.5 36.4.5 12.2 5.1 21.6 14.6 26.7 26.7 5 12.2 5 25.6-.1 37.7-10.5 25.1-39.4 37-64.6 26.5-11.6-4.8-20.4-13.6-25.4-24.2l28.5 11.8c18.6 7.8 39.9-.9 47.6-19.4zM400 32H48C21.5 32 0 53.5 0 80v160.7l116.6 48.1c12-8.2 26.2-12.1 40.7-11.3l55.4-80.2v-1.1c0-48.2 39.3-87.5 87.6-87.5s87.6 39.3 87.6 87.5c0 49.2-40.9 88.7-89.6 87.5l-79 56.3c1.6 38.5-29.1 68.8-65.7 68.8-31.8 0-58.5-22.7-64.5-52.7L0 319.2V432c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-99.7 222.5c-32.2 0-58.4-26.1-58.4-58.3s26.2-58.3 58.4-58.3 58.4 26.2 58.4 58.3-26.2 58.3-58.4 58.3zm.1-14.6c24.2 0 43.9-19.6 43.9-43.8 0-24.2-19.6-43.8-43.9-43.8-24.2 0-43.9 19.6-43.9 43.8 0 24.2 19.7 43.8 43.9 43.8z"
            ></motion.path>
          </Svg>
        </Box>
      </Wrapper>
    </>
  );
};

export default _;
