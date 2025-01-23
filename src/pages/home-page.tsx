import { useState } from 'react';

import { CreateList } from '../components/create-list';
import { List } from '../list';

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

    // TODO: state may not be incorrect here since the above line update might not have finished.
    // See what is the best approach to do this
    localStorage.setItem(
      combinedListState.id.toString(),
      JSON.stringify(combinedListState)
    );
  };
  return (
    <CreateList
      state={combinedListState}
      onUpdate={(state) => updateListState(state)}
    ></CreateList>
  );
};

export default HomePage;
