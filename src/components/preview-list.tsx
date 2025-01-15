import { Button, Card } from '@blueprintjs/core';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { List } from '../item';

export function PreviewList() {
  const params = useParams();
  const [list, setList] = useState(() => {
    if (params.id) {
      const storedValue = localStorage.getItem(params.id);
      return storedValue !== null ? (JSON.parse(storedValue) as List) : null;
    }
  });

  const reserveItem = (index: number) => {
    if (!!list) {
      list.items[index].isReserved = !list.items[index].isReserved;
      ({ items: list.items });
    }
  };
  return (
    <>
      <h1>{list?.name}</h1>
      {list?.description && <p>{list?.description}</p>}
      <>
        {list?.items.map((item, index) => (
          <Card>
            <h2>{item.name}</h2>
            {list.allowReservation && (
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
