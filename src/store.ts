import { makeAutoObservable } from 'mobx';

export type priceType = 'oneWay' | 'twoWay';
export type routeType = 'AtoB' | 'BtoA' | 'AtoBtoA' | string;
export type citiesType = 'Санкт-Петербург' | 'Сыктывкар';
export type scheduleType = { id: number; time: string; route: routeType }[];

class Store {
  currentRoute: routeType = 'AtoB';
  currentTickets: number = 0;
  currentTimeZone: number = 0;
  currentTime: string = '';
  currentTimeBack: string = '';
  cities: citiesType[] = ['Санкт-Петербург', 'Сыктывкар'];
  currentCities: citiesType[] = ['Санкт-Петербург', 'Сыктывкар'];
  routes: routeType[] = ['AtoB', 'BtoA', 'AtoBtoA'];

  schedule: scheduleType = [
    { id: 0, time: '2021-08-21 18:00:00', route: 'AtoB' },
    { id: 1, time: '2021-08-21 18:30:00', route: 'AtoB' },
    { id: 2, time: '2021-08-21 18:45:00', route: 'AtoB' },
    { id: 3, time: '2021-08-21 19:00:00', route: 'AtoB' },
    { id: 4, time: '2021-08-21 19:15:00', route: 'AtoB' },
    { id: 5, time: '2021-08-21 21:00:00', route: 'AtoB' },
    { id: 6, time: '2021-08-21 18:30:00', route: 'BtoA' },
    { id: 7, time: '2021-08-21 18:45:00', route: 'BtoA' },
    { id: 8, time: '2021-08-21 19:00:00', route: 'BtoA' },
    { id: 9, time: '2021-08-21 19:15:00', route: 'BtoA' },
    { id: 10, time: '2021-08-21 19:35:00', route: 'BtoA' },
    { id: 11, time: '2021-08-21 21:50:00', route: 'BtoA' },
    { id: 12, time: '2021-08-21 21:55:00', route: 'BtoA' },
  ];

  timeToTravel: number = 50;
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
