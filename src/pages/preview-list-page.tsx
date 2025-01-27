import { Button, Card } from '@blueprintjs/core';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { List } from '../list';

export function PreviewListPage() {
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
      // sort the reserved items to the bottom of the list
      list.items.sort((a, b) => {
        if (a.isReserved === b.isReserved) return 0;
        return a.isReserved ? 1 : -1;
      });
      setList({ ...list, items: list.items });
      localStorage.setItem(list.id.toString(), JSON.stringify(list));
    }
  };
  if (!list) {
    return;
  }
  return (
    <>
      <h1>{list.name}</h1>
      {list.description && <p className="center-align">{list.description}</p>}
      <>
        {list.items.map((item, index) => (
          <Card className="vertical-margin">
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
