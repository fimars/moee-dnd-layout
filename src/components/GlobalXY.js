import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: .3;
  pointer-events: none;
`;
const Line = styled.div`
  position: fixed;
  border: dashed 1px red;
`;
export const GlobalXY = ({ point: { x, y } }) => {
  return (
    <Wrapper>
      <Line style={{ width: "100vw", top: y + "px" }} />
      <Line style={{ height: "100vh", left: x + "px" }} />
    </Wrapper>
  );
};
