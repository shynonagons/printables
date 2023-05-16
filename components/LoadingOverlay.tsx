import { ActivityIndicator } from 'react-native';
import { View } from './Themed';

export default function LoadingOverlay() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={'large'} color="black" />
    </View>
  );
}
