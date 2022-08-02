import * as React from 'react';
import { StyleSheet, FlatList, useWindowDimensions } from 'react-native';

import SelectableItem from '../components/SelectableItem';
import { Text, View } from '../components/Themed';
import { SelectableItemProps } from '../types';
import { PRINT_RATE_LIMIT, usePrintContext } from '../context/PrintProvider';

import defaultSelectOptions from '../data/characters';

export default function SelectScreen() {
  const [selectOptions, setSelectOptions] = React.useState<SelectableItemProps[]>([]);
  const { printCount, getStoredPrintCount } = usePrintContext();

  React.useEffect(() => {
    setSelectOptions(defaultSelectOptions);
    getStoredPrintCount();
  }, []);

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text>
        {printCount} of {PRINT_RATE_LIMIT} printed
      </Text>
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
