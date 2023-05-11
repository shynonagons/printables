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
import useHistory from '../hooks/useHistory';
import HistoryItem from '../components/HistoryItem';
import tw from '../lib/tailwind';

export default function SelectScreen() {
  const [selectOptions, setSelectOptions] = React.useState<SelectableItemProps[]>([]);
  const { printCount, getStoredPrintCount } = usePrintContext();
  const { favorites } = useFavorites();
  const { history } = useHistory();

  React.useEffect(() => {
    getStoredPrintCount();
  }, []);

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Text style={tw`text-lg text-center pt-3`}>
        {printCount} of {PRINT_RATE_LIMIT} printed
      </Text>
      <View style={tw`items-center justify-center mt-20`}>
        <SearchInput />
        {/* <RecentSearches /> */}
        {/* <FlatList
        key={`favorites-${width}`}
          data={favorites}
          numColumns={Math.floor(width / 180)}
          renderItem={({ item }) => <SelectableItem {...item} />}
        /> */}
      </View>
      <FlatList
        key={`history-${width}`}
        data={history}
        numColumns={Math.floor(width / 180)}
        renderItem={({ item }) => <HistoryItem uri={item} />}
        contentContainerStyle={tw`flex-1 items-center mt-20`}
      />
    </SafeAreaView>
  );
}
