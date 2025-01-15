import { useState } from 'react';

import { CreateList } from '../components/create-list';
import { List } from '../item';

const HomePage = () => {
  const [combinedListState, setCombinedListState] = useState<List>({
    id: 1,
    name: 'Wish list',
    description: 'I want to buy these when I grow up!',
    items: [],
    allowReservation: false,
  });

  const updateListState = (newState: Partial<List>) => {
    setCombinedListState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };
  return (
    <>
      <CreateList
        state={combinedListState}
        onUpdate={(state) => updateListState(state)}
      ></CreateList>
    </>
  );
};

export default HomePage;
