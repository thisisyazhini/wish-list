import {
  Button,
  Card,
  Checkbox,
  Icon,
  InputGroup,
  TextArea,
} from '@blueprintjs/core';
import { List } from '../item';

type CreateListProps = {
  state: List;
  onUpdate: (state: Partial<List>) => void;
};

export function CreateList({ state, onUpdate }: CreateListProps) {
  const addItem = (newItem: string, index: number) => {
    const items = [
      ...state.items,
      { id: index, name: newItem, isReserved: false },
    ];
    onUpdate({ items: items });
  };

  const handleItemInputChange = (name: string, index: number) => {
    const itemsInList = [...state.items];
    itemsInList[index].name = name;
    onUpdate({ items: itemsInList });
  };
  const deleteItemInList = (index: number) => {
    const itemsInList = [
      ...state.items.slice(0, index),
      ...state.items.slice(index + 1),
    ];
    onUpdate({ items: itemsInList });
  };
  return (
    <>
      <Card>
        <h3>Design your wishlist</h3>
        <p>Create your list and share it with others!</p>
        <label>Title</label>
        <InputGroup
          large
          asyncControl={true}
          placeholder="Name the list"
          value={state.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
        <label>Description</label>
        <TextArea
          large
          asyncControl={true}
          placeholder="Purpose of the list"
          value={state.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
        />
        <Checkbox
          checked={state.allowReservation}
          onChange={() =>
            onUpdate({ allowReservation: !state.allowReservation })
          }
        >
          Should others be able to <strong>reserve items!</strong>
        </Checkbox>
        <label>Items</label>
        {state.items.map((item, index) => (
          <InputGroup
            large
            asyncControl={true}
            placeholder="iPad"
            rightElement={
              <Button minimal onClick={() => deleteItemInList(index)}>
                <Icon icon={'delete'} size={32} intent={'danger'} />
              </Button>
            }
            key={index}
            value={item.name}
            onChange={(event) =>
              handleItemInputChange(event.target.value, index)
            }
          />
        ))}
        <Button large onClick={() => addItem('', state.items.length + 1)}>
          + Add Item
        </Button>
        <>
          <Button large onClick={() => {}}>
            Create Wishlist
          </Button>
          <Button large onClick={() => {}}>
            Toggle Preview
          </Button>
        </>
      </Card>
    </>
  );
}
