import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import store, { routeType } from '../store';
import { getNormalizeTime } from './BlockSelectTime';

export const OrderInformation: React.FC = observer(() => {
  const tickets = (count: number = 5) => {
    let result = '';
    let count10 = count % 10;
    if (count10 === 1 && count !== 11) {
      result = 'билет';
    } else if (count10 && count10 < 5 && (count < 10 || count > 14)) {
      result = 'билета';
    } else result = 'билетов';
    return count + ' ' + result;
  };

  const way = (route: routeType) => {
    let city1,
      city2,
      back = '';
    if (route === 'BtoA') {
      city1 = store.currentCities[1];
      city2 = store.currentCities[0];
    } else {
      city1 = store.currentCities[0];
      city2 = store.currentCities[1];
    }
    if (route === 'AtoBtoA') back = ' и обратно';

    return (
      <>
        Вы выбрали {tickets(store.currentTickets)} по маршруту из г.
        {city1} в г.{city2 + back} по цене {store.totalPrice}р.
      </>
    );
  };

  return (
    <>
      <TicketsDiv>{way(store.currentRoute)}</TicketsDiv>
      <TravelTime>Это путешествие займет у вас {store.timeToTravel}</TravelTime>
      <StartTime>
        Теплоход отправляется {getNormalizeTime(store.currentTime)}
        {store.currentRoute === 'AtoBtoA' && (
          <EndTime>
            , и будет возвращаться назад в{' '}
            {getNormalizeTime(store.currentTimeBack)}
          </EndTime>
        )}
      </StartTime>
    </>
  );
});

const TicketsDiv = styled.div``;
const TravelTime = styled.div`
  margin-top: 10px;
`;
const StartTime = styled.div`
  margin-top: 10px;
`;
const EndTime = styled.span``;
