import { useParams } from "react-router";

const _ = () => {
  const { coinId } = useParams<string>();
  return (
    <>
      <h1>coin {coinId}</h1>
    </>
  );
};

export default _;
