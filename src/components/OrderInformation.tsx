import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import store, { routeType } from '../store';
import {
  getHumanizeDateAndTime,
  getTimeToTravel,
  ticketsOutput,
} from '../utils/timeAndWordEnding';

export const OrderInformation: React.FC = observer(() => {
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
      if (route === 'AtoBtoA') back = ' и обратно';
    }

    return (
      <>
        Вы выбрали {ticketsOutput(store.currentTickets)} по маршруту из г.
        {city1} в г.{city2 + back} по цене {store.totalPrice}р.
      </>
    );
  };

  return (
    <>
      <TicketsDiv>{way(store.currentRoute)}</TicketsDiv>
      <TravelTime>
        Это путешествие займет у вас{' '}
        {getTimeToTravel(
          store.currentTime,
          store.currentTimeBack,
          store.timeToTravel
        )}
      </TravelTime>
      <StartTime>
        Теплоход отправляется {getHumanizeDateAndTime(store.currentTime)}
        {store.currentRoute === 'AtoBtoA' && (
          <EndTime>
            , и будет возвращаться назад в{' '}
            {getHumanizeDateAndTime(store.currentTimeBack)}
          </EndTime>
        )}
      </StartTime>
      <ArrivalTime>
        В конечной точке маршрута вы будете в{' '}
        {getHumanizeDateAndTime(
          store.currentTimeBack || store.currentTime,
          store.timeToTravel
        )}
      </ArrivalTime>
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

const ArrivalTime = styled.div`
  margin-top: 10px;
`;
