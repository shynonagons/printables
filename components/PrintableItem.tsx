import { View } from './Themed';
import tw from '../lib/tailwind';
import { Image, Pressable } from 'react-native';
import { usePrintContext } from '../context/PrintProvider';

export default function PrintableItem({ uri }: { uri: string }) {
  const { handlePrint } = usePrintContext();
  const handlePress = () => {
    handlePrint(uri);
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={tw`p-1 m-2 rounded-xl border border-4 border-green bg-white`}>
        <Image source={{ uri }} style={tw`w-[140px] h-[200px]`} />
      </View>
    </Pressable>
  );
}
