import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
import store, { routeType, scheduleType } from '../store';
import { getHumanizeDateAndTime } from '../utils/timeAndWordEnding';
import { ContentContainer, MainContainer } from './BlockSelectRoute';

interface IBlockSelectTime {
  route: routeType;
}

export const BlockSelectTime: React.FC<IBlockSelectTime> = observer(
  ({ route }) => {
    /**
     * Rendering a select list item
     * @param key - Key
     * @param el - Time in correct format
     */
    const renderOptions = (key: number, el: string) => {
      return (
        <SelectorOption key={key} value={el}>
          {getHumanizeDateAndTime(el)}
        </SelectorOption>
      );
    };

    /**
     * Displaying the correct timetable for ships
     * @param selectedRoute
     */
    const getSchedule = (selectedRoute: routeType) => {
      let returnedArr: scheduleType = [];

      switch (selectedRoute) {
        case 'AtoB':
          returnedArr = store.schedule.filter((element) => {
            return element.route === selectedRoute;
          });
          break;
        case 'BtoA':
          if (store.currentRoute === 'AtoBtoA') {
            returnedArr = store.schedule.filter(
              (element) =>
                Number(new Date(element.time)) >=
                  Number(new Date(store.currentTime)) +
                    1000 * 60 * store.timeToTravel &&
                element.route === selectedRoute
            );
          } else {
            returnedArr = store.schedule.filter(
              (element) => element.route === selectedRoute
            );
          }
          break;
      }

      if (selectedRoute === 'AtoB') {
        return (
          <ContentSelector
            onChange={(e) => {
              store.setCurrentTime(e.target.value);
            }}
            required
            value={store.currentTime}
          >
            <SelectorOption key={-1} value="" />
            {returnedArr.map((element, idx) => {
              return renderOptions(idx, element.time);
            })}
          </ContentSelector>
        );
      } else
        return (
          <ContentSelector
            onChange={(e) => {
              if (selectedRoute === 'BtoA' && store.currentRoute === 'BtoA') {
                store.setCurrentTime(e.target.value);
              } else store.setCurrentTimeBack(e.target.value);
            }}
            required
            value={
              store.currentRoute === 'BtoA'
                ? store.currentTime
                : store.currentTimeBack
            }
          >
            <SelectorOption key={-1} value="" />
            {returnedArr.map((element, idx) => {
              return renderOptions(idx, element.time);
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

const LabelContainer = styled.div`
  padding-right: 40px;
`;
const LabelText = styled.label`
  font-size: 20px;
`;
const ContentSelector = styled.select``;
const SelectorOption = styled.option``;
