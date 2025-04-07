import { ListContext } from '@/lib/utils';
import { useContext } from 'react';

export const useList = () => {
  const list = useContext(ListContext);
  return list?.combinedListState;
};
