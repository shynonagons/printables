import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_RECENT_SEARCHES = 20;

export default function useRecentSearches() {
  const add = async (searchString: string) => {
    const recents = await AsyncStorage.getItem('recentSearch');
    const parsedRecents = JSON.parse(recents || '[]');
    const newRecents = [searchString, ...parsedRecents];
    if (newRecents.length >= MAX_RECENT_SEARCHES) newRecents.pop();
    const stringifiedRecents = JSON.stringify(newRecents);
    await AsyncStorage.setItem('recentSearch', stringifiedRecents);
  };

  const get = async () => {
    const recents = await AsyncStorage.getItem('recentSearch');
    const parsedRecents = JSON.parse(recents || '[]');
    return parsedRecents;
  };

  const clear = async () => {
    await AsyncStorage.removeItem('recentSearch');
  };
  return { add, get, clear };
}
