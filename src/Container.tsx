import { useRecoilValue, useSetRecoilState } from "recoil";

import styled, { ThemeProvider } from "styled-components";
import { isDarkAtom } from "./atoms";
import { darkTheme, lightTheme } from "./theme";

const ThemeChangeButton = styled.button`
  position: absolute;
  right: 2em;
  top: 2em;
  padding: 0.5em 1em;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const Wrap = styled.div`
  position: relative;
  margin: 2em auto 6em;
  max-width: 620px;
`;

const _ = ({ children }: any) => {
  const isDark = useRecoilValue(isDarkAtom);
  const setIsDark = useSetRecoilState(isDarkAtom);

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Wrap>
          <ThemeChangeButton onClick={() => toggleDark()}>
            {isDark ? "Light Theme" : "Dark Theme"}
          </ThemeChangeButton>
          {children}
        </Wrap>
      </ThemeProvider>
    </>
  );
};

export default _;
