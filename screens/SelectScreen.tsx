import * as React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Dimensions } from 'react-native';

import SelectableItem from '../components/SelectableItem';
import { Text, View } from '../components/Themed';
import { SelectableItemProps } from '../types';
import usePrint from '../hooks/usePrint';

import defaultSelectOptions from '../data/characters';

export default function SelectScreen() {
  const [selectOptions, setSelectOptions] =
    React.useState<SelectableItemProps[]>();
  const { printCount, getStoredPrintCount } = usePrint();
  React.useEffect(() => {
    setSelectOptions(defaultSelectOptions);
    getStoredPrintCount();
  }, []);

  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text>You have printed {printCount} pages so far</Text>
      <FlatList
        data={selectOptions}
        numColumns={Math.floor(width / 180)}
        renderItem={({ item }) => <SelectableItem {...item} />}
      />
    </View>
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
});
