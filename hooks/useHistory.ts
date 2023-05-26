import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { create } from 'zustand'

const MAX_HISTORY_LENGTH = 20;

const useHistoryStore = create<{history: string[]; setHistory: (history: string[]) => void}>((set) => ({
    history: [],
    setHistory: (history: string[]) => set((state) => ({ history })),
}))

export default function useHistory() {
    const history = useHistoryStore((state) => state.history)
    const setHistory = useHistoryStore((state) => state.setHistory)
  useEffect(() => {
    (async () => {
      const storedHistory = await AsyncStorage.getItem('history');
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    })();
  }, []);
  const addHistoryItem = (item: any) => {
    // Check max history items
    const historyOrShifted = history.length > MAX_HISTORY_LENGTH ? history.slice(0, -1) : history;
    const newHistory = [...new Set([item, ...historyOrShifted])];
    setHistory(newHistory);
    AsyncStorage.setItem('history', JSON.stringify(newHistory));
  };
  return { history, addHistoryItem };
}
