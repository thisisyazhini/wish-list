import {
  Button,
  Card,
  Checkbox,
  Icon,
  InputGroup,
  TextArea,
} from '@blueprintjs/core';
import { List } from '../item';
import { Link } from 'react-router-dom';

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
  const saveToStorage = () => {
    localStorage.setItem(state.id.toString(), JSON.stringify(state));
  };
  return (
    <>
      <Card>
        <h3>Design your wishlist</h3>
        <p>Create your list and share it with others!</p>
        <label>Title</label>
        <InputGroup
          className="vertical-margin"
          large
          asyncControl={true}
          placeholder="Name the list"
          value={state.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
        />
        <label>Description</label>
        <TextArea
          className="vertical-margin block"
          large
          autoResize={true}
          asyncControl={true}
          placeholder="Purpose of the list"
          value={state.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
        />
        <Checkbox
          label="Should others be able to <strong>reserve items!</strong>"
          checked={state.allowReservation}
          onChange={() =>
            onUpdate({ allowReservation: !state.allowReservation })
          }
        ></Checkbox>
        <label>Items</label>
        {state.items.map((item, index) => (
          <InputGroup
            className="vertical-margin"
            large
            asyncControl={true}
            placeholder="iPad"
            rightElement={
              <Button minimal onClick={() => deleteItemInList(index)}>
                <Icon icon={'delete'} size={20} />
              </Button>
            }
            key={index}
            value={item.name}
            onChange={(event) =>
              handleItemInputChange(event.target.value, index)
            }
          />
        ))}
        <Button
          className="vertical-margin block"
          large
          onClick={() => addItem('', state.items.length + 1)}
        >
          + Add Item
        </Button>
        <div className="flex">
          <Button
            large
            onClick={() => {
              saveToStorage();
            }}
          >
            Create Wishlist
          </Button>
          <Button className="left-margin" large>
            <Link to={`/preview/${state.id}`}>Toggle Preview</Link>
          </Button>
        </div>
      </Card>
    </>
  );
}
