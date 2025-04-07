import { useState } from 'react';

import { CreateList } from '../components/create-list';
import { List } from '../list';
import { ListContext } from '@/lib/utils';

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
    <div className="flex justify-center px-10 ">
      <ListContext.Provider value={{ combinedListState, setCombinedListState }}>
        <CreateList
          state={combinedListState}
          onUpdate={(state) => updateListState(state)}
        ></CreateList>
      </ListContext.Provider>
    </div>
  );
};

export default HomePage;
