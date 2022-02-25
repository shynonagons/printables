import * as React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SelectableItemProps } from '../types';

export default function SelectableItem({
  name,
  uri = 'https://maxcdn.icons8.com/Share/icon/Cinema/avengers1600.png',
  searchTerm,
  onSelect,
}: SelectableItemProps) {
  const navigation = useNavigation();
  const onSelectItem = () => (onSelect ? onSelect() : navigation.navigate('CharacterScreen', { name, searchTerm }));
  return (
    <TouchableOpacity style={styles.selectable} onPress={onSelectItem}>
      <Image source={{ uri }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectable: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
  name: { fontSize: 18 },
  image: {
    width: 140,
    height: 140,
  },
});
