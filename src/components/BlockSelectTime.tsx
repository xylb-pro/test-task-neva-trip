import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import store, { routeType } from '../store';

interface IBlockSelectTime {
  route: routeType;
}

export const BlockSelectTime: React.FC<IBlockSelectTime> = observer(
  ({ route }) => {
    const renderOptions = (key: number, el: string) => {
      return (
        <SelectorOption key={key} value={el}>
          {getNormalizeTime(el)}
        </SelectorOption>
      );
    };

    const getSchedule = (selectedRoute: routeType) => {
      return (
        <ContentSelector
          onChange={(e) => {
            if (route === 'BtoA' && store.currentRoute === 'AtoBtoA') {
              store.setCurrentTimeBack(e.target.value);
            } else if (store.currentRoute === 'AtoBtoA') {
              if (moment(store.currentTime).isAfter(e.target.value)) {
                store.setCurrentTime(e.target.value);
              } else {
                store.setCurrentTime(e.target.value);
                store.setCurrentTimeBack('');
              }
            } else {
              store.setCurrentTimeBack('');
              store.setCurrentTime(e.target.value);
            }
          }}
        >
          {store.schedule[selectedRoute].map((el, i) => {
            if (
              moment(el).isAfter(
                moment(store.currentTime).add(50, 'minutes')
              ) &&
              store.currentRoute === 'AtoBtoA' &&
              route === 'BtoA'
            ) {
              if (store.currentTimeBack === '') {
                store.setCurrentTimeBack(el);
              }
              return renderOptions(i, el);
            } else if (store.currentRoute !== 'AtoBtoA' || route === 'AtoB') {
              if (store.currentRoute === 'BtoA' && i === 0) {
                store.setCurrentTime(el);
              }
              return renderOptions(i, el);
            }
          })}
        </ContentSelector>
      );
    };

    return (
      <MainContainer>
        <ContentContainer>
          <LabelContainer>
            <LabelText>Выберите время</LabelText>
          </LabelContainer>
          {getSchedule(route)}
          <LabelText> по вашему времени</LabelText>
        </ContentContainer>
      </MainContainer>
    );
  }
);

export const getNormalizeTime = (date: string) => {
  let currentDate = moment(date).add(store.currentTimeZone, 'minutes');
  let hours: string = currentDate.hours().toString();
  let minutes: string = currentDate.minutes().toString();
  if (minutes.length < 2) minutes = '0' + minutes;
  if (hours.length < 2) hours = '0' + hours;
  return `${hours}:${minutes}`;
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

const LabelContainer = styled.div`
  padding-right: 40px;
`;
const LabelText = styled.label`
  font-size: 20px;
`;
const ContentSelector = styled.select``;
const SelectorOption = styled.option``;
