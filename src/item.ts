export interface List {
    id: number;
    name: string;
    description?: string;
    allowReservation: boolean;
    items: Item[];
  }


  export interface Item{
    id: number;
    name: string;
    image?: string;
    link?: string;
    isReserved: boolean;
  }