import styled from "styled-components";

export const LoadingContainer = styled.div`
  background-color: hsla(0, 0%, 0%, 0.5);
  height: 100%;
  width: 100%;
  z-index: 1000;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;
