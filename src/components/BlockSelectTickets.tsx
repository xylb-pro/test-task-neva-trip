import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import store from '../store';
export const BlockSelectTickets: React.FC = observer(() => {
  return (
    <MainContainer>
      <ContentContainer>
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

const MainContainer = styled.div`
  max-width: 900px;
  display: flex;
  margin: 0 auto;
  padding: 100px 0px 50px 0px;
`;
const ContentContainer = styled.div`
  margin: 0 auto;
`;
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
