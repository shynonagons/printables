import * as React from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import { PRINT_RATE_LIMIT, usePrintContext } from '../context/PrintProvider';

import SearchInput from '../components/SearchInput';
import RecentSearches from '../components/RecentSearches';
import { SafeAreaView } from 'react-native-safe-area-context';
import useHistory from '../hooks/useHistory';
import PrintableItem from '../components/PrintableItem';
import tw from '../lib/tailwind';
import SelectableItem from '../components/SelectableItem';
import characters from '../data/characters';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from '../components/ImagePicker';
import SavedImages from '../components/SavedImages';

export default function SelectScreen() {
  const { printCount, getStoredPrintCount } = usePrintContext();
  const { history } = useHistory();

  React.useEffect(() => {
    getStoredPrintCount();
  }, []);

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-black px-5`}>
      <View style={tw`mt-5`}>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <Text style={tw`text-2xl`}>Printables</Text>
              {/* <Text style={tw`text-lg text-center pt-3`}>
                {printCount} of {PRINT_RATE_LIMIT} printed
              </Text> */}
              <View style={tw`items-center justify-center mt-5`}>
                <ImagePicker />
                <SearchInput />
                {/* <RecentSearches /> */}
                {/* <FlatList
          key={`favorites-${width}`}
            data={favorites}
            numColumns={Math.floor(width / 180)}
            renderItem={({ item }) => <SelectableItem {...item} />}
          /> */}
              </View>
              <SavedImages />
              {history.length > 0 && (
                <View style={tw`mt-20`}>
                  <Text style={tw`text-xl`}>Print It Again</Text>
                  <FlatList
                    key={`history-${width}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={history}
                    renderItem={({ item }) => <PrintableItem uri={item} />}
                  />
                </View>
              )}
              <Text style={tw`text-xl`}>Characters</Text>
            </>
          )}
          key={`characters-${width}`}
          data={characters}
          numColumns={Math.floor(width / 160)}
          renderItem={({ item }) => <SelectableItem {...item} key={item.key} />}
        />
      </View>
    </SafeAreaView>
  );
}
