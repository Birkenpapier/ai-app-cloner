import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

import { makeId } from './store';
import { tokens } from './tokens';

// On-device transaction store (the "actually works" feature). Add an expense ->
// it appears in the timeline, the cash-flow total updates, and it persists across
// reloads via AsyncStorage. No backend.

export type CategoryKey = 'food' | 'shopping' | 'transport' | 'home' | 'fun';
export const CATEGORIES: { key: CategoryKey; label: string; color: string }[] = [
  { key: 'food', label: 'Food & Drink', color: tokens.colors.cat.food },
  { key: 'shopping', label: 'Shopping', color: tokens.colors.cat.shopping },
  { key: 'transport', label: 'Transport', color: tokens.colors.cat.transport },
  { key: 'home', label: 'Home', color: tokens.colors.cat.home },
  { key: 'fun', label: 'Fun', color: tokens.colors.cat.fun },
];

export type Txn = {
  id: string;
  category: CategoryKey;
  wallet: string;
  amount: number; // negative = expense
};

const KEY = 'spendee.txns';
let txns: Txn[] = [{ id: 'seed-1', category: 'food', wallet: 'Cash Wallet', amount: -111 }];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function persist() {
  void AsyncStorage.setItem(KEY, JSON.stringify(txns));
  emit();
}

if (typeof window !== 'undefined') {
  void AsyncStorage.getItem(KEY).then((raw) => {
    if (raw) {
      txns = JSON.parse(raw) as Txn[];
      emit();
    }
  });
}

export function addTxn(category: CategoryKey, amount: number, wallet = 'Cash Wallet') {
  txns = [{ id: makeId(), category, wallet, amount }, ...txns];
  persist();
}

export function useTxns(): Txn[] {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => txns,
    () => txns,
  );
}

export function categoryOf(key: CategoryKey) {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0];
}
