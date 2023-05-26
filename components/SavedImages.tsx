import { useWindowDimensions } from 'react-native';
import tw from '../lib/tailwind';
import useSavedImages from '../hooks/useSavedImages';
import { Text, View } from './Themed';
import PrintableItem from './PrintableItem';
import { FlatList } from 'react-native-gesture-handler';

export default function SavedImages() {
  const { savedImages } = useSavedImages();
  const { width } = useWindowDimensions();
  return savedImages.length > 0 ? (
    <View style={tw`mt-20`}>
      <Text style={tw`text-2xl`}>Your Printables</Text>
      <FlatList
        key={`saved-${width}`}
        horizontal
        data={savedImages}
        renderItem={({ item }) => <PrintableItem uri={item} />}
        contentContainerStyle={tw`flex-1 items-center`}
      />
    </View>
  ) : null;
}
