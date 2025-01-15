import { Button, Card } from '@blueprintjs/core';
import { List } from '../item';

export function PreviewList({
  state,
  onReservation,
}: {
  state: List;
  onReservation: (state: Partial<List>) => void;
}) {
  const reserveItem = (index: number) => {
    state.items[index].isReserved = !state.items[index].isReserved;
    onReservation({ items: state.items });
  };
  return (
    <>
      <h1>{state.name}</h1>
      {state.description && <p>{state.description}</p>}
      <>
        {state.items.map((item, index) => (
          <Card>
            <h2>{item.name}</h2>
            {state.allowReservation && (
              <Button key={index} onClick={() => reserveItem(index)}>
                {item.isReserved ? 'Item Reserved' : 'Reserve Item'}
              </Button>
            )}
          </Card>
        ))}
      </>
    </>
  );
}
