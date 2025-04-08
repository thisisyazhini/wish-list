import { Link } from 'react-router-dom';
import { List } from '../list';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useList } from './useList';

type CreateListProps = {
  state: List;
  onUpdate: (state: Partial<List>) => void;
};

export function CreateList({ state, onUpdate }: CreateListProps) {
  const list = useList();
  const addItem = (newItem: string, index: number) => {
    const items = [
      ...state.items,
      { id: index, name: newItem, isReserved: false },
    ];
    onUpdate({ items: items });
    // saveToStorage();
  };

  const handleItemInputChange = (name: string, index: number) => {
    const itemsInList = [...state.items];
    itemsInList[index].name = name;
    onUpdate({ items: itemsInList });
    // saveToStorage();
  };
  const deleteItemInList = (index: number) => {
    const itemsInList = [
      ...state.items.slice(0, index),
      ...state.items.slice(index + 1),
    ];
    onUpdate({ items: itemsInList });
    // saveToStorage();
  };
  // const saveToStorage = () => {
  //   // TODO: Duplicated here and in parent
  //   localStorage.setItem(state.id.toString(), JSON.stringify(state));
  // };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Design your wishlist</CardTitle>
        <CardDescription>
          Create your list and share it with others!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Title</Label>
          <Input
            className="rounded-2xl"
            placeholder="Name the list"
            id="message"
            value={state.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Description</Label>
          <Textarea
            placeholder="Purpose of the list"
            id="message"
            value={state.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
          />
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="terms1"
            onChange={() =>
              onUpdate({ allowReservation: !state.allowReservation })
            }
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Should others be able to
              <strong> reserve items!</strong>
            </label>
            <p className="text-sm text-muted-foreground">
              You will be able to see if the item is reserved!
            </p>
          </div>
        </div>
        <label>
          <strong>Items</strong>
        </label>
        {state.items.length === 0 && <p>Add an item</p>}
        {list?.items.map((item, index) => (
          <div
            className="flex w-full max-w-sm items-center space-x-2"
            key={index}
          >
            <Input
              type="text"
              placeholder="iPad"
              value={item.name}
              onChange={(event) =>
                handleItemInputChange(event.target.value, index)
              }
            />
            <Button
              type="submit"
              variant="outline"
              onClick={() => deleteItemInList(index)}
            >
              Delete
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          variant="outline"
          onClick={() => addItem('', state.items.length + 1)}
        >
          + Add Item
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">Create Wishlist</Button>
          <Link to={`/preview/${state.id}`}>
            <Button variant="outline">Toggle Preview</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
