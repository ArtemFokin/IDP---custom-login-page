import styled, { keyframes } from "styled-components";

const OFFSET = 187;
const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`;

const dash = keyframes`
  0% { stroke-dashoffset: ${OFFSET}; }
  50% {
    stroke-dashoffset: ${OFFSET / 4};
    transform:rotate(135deg);
  }
  100% {
    stroke-dashoffset: ${OFFSET};
    transform:rotate(450deg);
  }
`;

const Container = styled.div`
  font-size: inherit;
  svg {
    animation: ${rotator} 1.4s linear infinite;
  }
  circle {
    stroke-dasharray: ${OFFSET};
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: ${dash} 1.4s ease-in-out infinite;
    stroke: currentColor;
  }
`;

const Spinner = () => {
  return (
    <Container>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </Container>
  );
};

export default Spinner;
