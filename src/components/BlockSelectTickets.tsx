import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import store from '../store';
import { ContentContainer, MainContainer } from './BlockSelectRoute';
export const BlockSelectTickets: React.FC = observer(() => {
  return (
    <MainContainer>
      <ContentContainer style={{ display: 'block' }}>
        <LabelContainer>
          <LabelText>Введите количество билетов</LabelText>
        </LabelContainer>
        <InputContainer>
          <InputField
            type="text"
            maxLength={2}
            onChange={(e) => store.setCurrentTickets(+e.target.value)}
            required
          />
        </InputContainer>
      </ContentContainer>
    </MainContainer>
  );
});

const LabelContainer = styled.div``;
const LabelText = styled.label`
  font-size: 20px;
`;
const InputContainer = styled.div`
  width: 50px;
  margin: 20px auto 0px;
`;
const InputField = styled.input`
  width: 100%;
  height: 25px;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid black;
  outline: none;
`;
