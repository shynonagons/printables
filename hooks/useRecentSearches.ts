import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectableItemProps } from '../types';

const MAX_RECENT_SEARCHES = 20;

export default function useRecentSearches() {
  const add = async (searchString: string) => {
    const recents = await AsyncStorage.getItem('recentSearch');
    const parsedRecents = JSON.parse(recents || '[]');
    if (parsedRecents.includes(searchString)) return; 
    const newRecents = [searchString, ...parsedRecents];
    if (newRecents.length >= MAX_RECENT_SEARCHES) newRecents.pop();
    const stringifiedRecents = JSON.stringify(newRecents);
    await AsyncStorage.setItem('recentSearch', stringifiedRecents);
  };

  const get = async () => {
    const recents = await AsyncStorage.getItem('recentSearch');
    const parsedRecents = [...new Set(JSON.parse(recents || '[]'))];
    return parsedRecents as SelectableItemProps[];
  };

  const remove = async (name: string) => {
    const stored = await get();
    const newStored = stored.filter((item) => item.name === name)
    await AsyncStorage.setItem('recentSearch', JSON.stringify(newStored))
  }

  const clear = async () => {
    await AsyncStorage.removeItem('recentSearch');
  };
  return { add, get, remove, clear };
}
