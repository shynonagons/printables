import * as React from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, useWindowDimensions } from 'react-native';

import { Text, View } from '../components/Themed';
import { PRINT_RATE_LIMIT, usePrintContext } from '../context/PrintProvider';
import handdrawn from '../data/handdrawn';

export default function CustomScreen() {
  const { width } = useWindowDimensions();
  const { handlePrint, printCount } = usePrintContext();
  const handleOnPress = (image: string) => {
    handlePrint(image);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Custom Prints</Text>
      <Text>
        {printCount} of {PRINT_RATE_LIMIT} printed
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        numColumns={Math.floor(width / 180)}
        data={Object.values(handdrawn)}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleOnPress(item)}>
            <Image source={{ uri: item }} style={styles.imageThumbStyle} />
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  imageThumbStyle: {
    margin: 10,
    height: 140,
    width: 140,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
});
