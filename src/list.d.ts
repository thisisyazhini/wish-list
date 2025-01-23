export interface List {
  id: number;
  name: string;
  description?: string;
  allowReservation: boolean;
  items: Item[];
}
