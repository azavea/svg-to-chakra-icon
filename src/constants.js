import { keyframes } from "@chakra-ui/react";

const pulseKeyframes = keyframes`
  from {
      transform: scale(0.8);
  }
  50% {
      transform: scale(1.2);
  }
  to {
      transform: scale(1.0);
  }
`;

export const pulseAnimation = `250ms ease ${pulseKeyframes}`;
