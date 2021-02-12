import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import store from '../store';

export const BlockSelectRoute: React.FC = observer(() => {
  return (
    <MainContainer>
      <ContentContainer>
        <LabelContainer>
          <LabelText>Выберите направление</LabelText>
        </LabelContainer>
        <ContentSelector
          onChange={(e) => {
            store.setCurrentRoute(e.target.value);
            store.setCurrentTime('2021-08-21 18:00:00');
            store.setCurrentTimeBack('');
          }}
        >
          <SelectorOption value={store.routes[0]}>
            Из {store.currentCities[0]} в {store.currentCities[1]}
          </SelectorOption>
          <SelectorOption value={store.routes[1]}>
            Из {store.currentCities[1]} в {store.currentCities[0]}
          </SelectorOption>
          <SelectorOption value={store.routes[2]}>
            Из {store.currentCities[0]} в {store.currentCities[1]} и обратно в{' '}
            {store.currentCities[0]}
          </SelectorOption>
        </ContentSelector>
      </ContentContainer>
    </MainContainer>
  );
});

export const MainContainer = styled.div`
  max-width: 900px;
  display: flex;
  margin: 0 auto;
  padding: 100px 0px 50px 0px;
`;
export const ContentContainer = styled.div`
  margin: 0 auto;
  display: flex;
`;
const LabelContainer = styled.div`
  padding-right: 40px;
`;
const LabelText = styled.label`
  font-size: 20px;
`;
const ContentSelector = styled.select``;
const SelectorOption = styled.option``;
