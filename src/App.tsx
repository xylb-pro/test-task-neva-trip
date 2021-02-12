import './App.sass';
import { BlockSelectTickets } from './components/BlockSelectTickets';
import { BlockSelectTime } from './components/BlockSelectTime';
import { BlockSelectRoute } from './components/BlockSelectRoute';
import { BlockButton } from './components/BlockButton';
import store from './store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ModalWindow } from './components/ModalWindow';
import { OrderInformation } from './components/OrderInformation';

const App = observer(() => {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    store.setCurrentTimeZone(new Date().getTimezoneOffset() + 180);
  }, []);
  return (
    <form
      id="calculateCost"
      onSubmit={(e) => {
        e.preventDefault();
        setIsOpened(true);
      }}
    >
      <BlockSelectRoute />
      {store.currentRoute === 'AtoBtoA' ? (
        <>
          <BlockSelectTime route="AtoB" />
          {store.currentTime !== '' ? <BlockSelectTime route="BtoA" /> : <></>}
        </>
      ) : (
        <BlockSelectTime route={store.currentRoute} />
      )}
      <BlockSelectTickets />
      <BlockButton />
      <ModalWindow setIsOpened={() => setIsOpened(false)} isOpened={isOpened}>
        <OrderInformation />
      </ModalWindow>
    </form>
  );
});

export default App;
