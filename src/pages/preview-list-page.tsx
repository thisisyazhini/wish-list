import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { List } from '../list';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';

export function PreviewListPage() {
  const params = useParams();
  const [list, setList] = useState(() => {
    if (params.id) {
      const storedValue = localStorage.getItem(params.id);
      return storedValue !== null ? (JSON.parse(storedValue) as List) : null;
    }
  });

  const reserveItem = (index: number) => {
    if (list) {
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
    <div className="flex justify-center rounded-lg tranform rotate-2 min-w-screen">
      <Card className="bg-indigo-500 text-white font-display min-w-xl">
        <CardHeader>
          <h1>{list.name}</h1>
          {list.description && (
            <p className="center-align">{list.description}</p>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {list.items.map((item, index) => (
            <Card>
              <CardContent className="flex items-center justify-between">
                <Label>{item.name}</Label>

                {!list.allowReservation && (
                  <Button
                    variant="outline"
                    key={index}
                    onClick={() => reserveItem(index)}
                  >
                    {item.isReserved ? 'Item Reserved' : 'Reserve Item'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
