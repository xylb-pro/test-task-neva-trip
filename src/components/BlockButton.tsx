import React from 'react';
import styled from 'styled-components';

export const BlockButton: React.FC = () => {
  return (
    <MainContainer>
      <ContentContainer>
        <ButtonBlock form="calculateCost" type="submit">
          Расчитать
        </ButtonBlock>
      </ContentContainer>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  max-width: 900px;
  display: flex;
  margin: 0 auto;
  padding: 100px 0px 50px 0px;
`;
const ContentContainer = styled.div`
  margin: 0 auto;
  display: flex;
`;
const ButtonBlock = styled.button`
  font-family: 'Ubuntu', sans-serif;
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 20px;
  outline: none;
  border: none;
  box-shadow: 0 0 10px #00000099;
  :active {
    transform: scale(0.98);
  }
`;
