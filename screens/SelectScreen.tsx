import * as React from 'react';
import { StyleSheet, FlatList, useWindowDimensions } from 'react-native';

import SelectableItem from '../components/SelectableItem';
import { Text, View } from '../components/Themed';
import { SelectableItemProps } from '../types';
import { PRINT_RATE_LIMIT, usePrintContext } from '../context/PrintProvider';

import SearchInput from '../components/SearchInput';
import RecentSearches from '../components/RecentSearches';
import { SafeAreaView } from 'react-native-safe-area-context';
import useFavorites from '../hooks/useFavorites';

export default function SelectScreen() {
  const [selectOptions, setSelectOptions] = React.useState<SelectableItemProps[]>([]);
  const { printCount, getStoredPrintCount } = usePrintContext();
  const { favorites } = useFavorites();

  React.useEffect(() => {
    getStoredPrintCount();
  }, []);

  const { width } = useWindowDimensions();

  console.log('should rerender my faves now', favorites);

  return (
    <SafeAreaView style={styles.contentContainer}>
      <View style={styles.container}>
        <Text style={styles.printCount}>
          {printCount} of {PRINT_RATE_LIMIT} printed
        </Text>
        <SearchInput />
        <RecentSearches />
        <FlatList
          data={favorites}
          numColumns={Math.floor(width / 180)}
          renderItem={({ item }) => <SelectableItem {...item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  printCount: {
    fontSize: 18,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
