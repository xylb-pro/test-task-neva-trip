import { makeAutoObservable } from 'mobx';

export type priceType = 'oneWay' | 'twoWay';
export type routeType = 'AtoB' | 'BtoA' | 'AtoBtoA' | string;
export type citiesType = 'Санкт-Петербург' | 'Сыктывкар';

class Store {
  currentRoute: routeType = 'AtoB';
  currentTickets: number = 0;
  currentTimeZone: number = 0;
  currentTime: string = '2021-08-21 18:00:00';
  currentTimeBack: string = '';
  cities: citiesType[] = ['Санкт-Петербург', 'Сыктывкар'];
  currentCities: citiesType[] = ['Санкт-Петербург', 'Сыктывкар'];
  routes: routeType[] = ['AtoB', 'BtoA', 'AtoBtoA'];
  schedule: { [K in routeType]: string[] } = {
    AtoB: [
      '2021-08-21 18:00:00',
      '2021-08-21 18:30:00',
      '2021-08-21 18:45:00',
      '2021-08-21 19:00:00',
      '2021-08-21 19:15:00',
      '2021-08-21 21:00:00',
    ],
    BtoA: [
      '2021-08-21 18:30:00',
      '2021-08-21 18:45:00',
      '2021-08-21 19:00:00',
      '2021-08-21 19:15:00',
      '2021-08-21 19:35:00',
      '2021-08-21 21:50:00',
      '2021-08-21 21:55:00',
    ],
  };

  timeToTravel: string = '50 минут';
  price: {
    [K in priceType]: number;
  } = {
    oneWay: 700,
    twoWay: 1200,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentRoute(currentRoute: routeType | string) {
    this.currentRoute = currentRoute;
  }
  setCurrentTickets(amount: number) {
    this.currentTickets = amount;
  }
  setCurrentTimeZone(z: number) {
    this.currentTimeZone = z;
  }
  setCurrentTime(time: string) {
    this.currentTime = time;
  }
  setCurrentTimeBack(time: string) {
    this.currentTimeBack = time;
  }
  get totalPrice() {
    let totalPrice = this.currentTickets;
    this.currentRoute !== 'AtoBtoA'
      ? (totalPrice *= this.price.oneWay)
      : (totalPrice *= this.price.twoWay);
    return totalPrice;
  }
}

export default new Store();
