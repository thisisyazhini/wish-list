import { List } from '@/list';
import { clsx, type ClassValue } from 'clsx';
import { createContext } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ListContext = createContext<{
  combinedListState: List;
  setCombinedListState(list: List): void;
} | null>(null);
