import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const MAX_HISTORY_LENGTH = 20;

export default function useHistory() {
  const [history, setHistory] = useState<string[]>([]);
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
