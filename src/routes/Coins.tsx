import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

const _ = () => {
  return (
    <>
      <Title>coins</Title>
    </>
  );
};

export default _;
