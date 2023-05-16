import * as React from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import { PRINT_RATE_LIMIT, usePrintContext } from '../context/PrintProvider';

import SearchInput from '../components/SearchInput';
import RecentSearches from '../components/RecentSearches';
import { SafeAreaView } from 'react-native-safe-area-context';
import useHistory from '../hooks/useHistory';
import HistoryItem from '../components/HistoryItem';
import tw from '../lib/tailwind';
import SelectableItem from '../components/SelectableItem';
import characters from '../data/characters';
import { ScrollView } from 'react-native-gesture-handler';

export default function SelectScreen() {
  const { printCount, getStoredPrintCount } = usePrintContext();
  const { history } = useHistory();

  React.useEffect(() => {
    getStoredPrintCount();
  }, []);

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-black`}>
      <ScrollView style={tw`flex-1`} contentContainerStyle={tw`mx-5`}>
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
        {history.length > 0 && (
          <View style={tw`mt-20`}>
            <Text style={tw`text-2xl`}>Print It Again</Text>
            <FlatList
              key={`history-${width}`}
              horizontal
              data={history}
              renderItem={({ item }) => <HistoryItem uri={item} />}
              contentContainerStyle={tw`flex-1 items-center`}
            />
          </View>
        )}
        <View style={tw`mt-20`}>
          <Text style={tw`text-2xl`}>Characters</Text>
          <FlatList
            key={`characters-${width}`}
            data={characters}
            numColumns={Math.floor(width / 160)}
            renderItem={({ item }) => <SelectableItem {...item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
