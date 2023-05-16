import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { useNavigation } from '@react-navigation/native';
import { SelectableItemProps } from '../types';
import tw from '../lib/tailwind';

export default function SelectableItem({ name, uri, image, searchTerm, onSelect }: SelectableItemProps) {
  const navigation = useNavigation();
  const onSelectItem = () => (onSelect ? onSelect() : navigation.navigate('SearchResults', { name, searchTerm }));
  return (
    <TouchableOpacity
      style={tw`m-2 items-center justify-center border-4 border-green rounded-xl w-[140px]`}
      onPress={onSelectItem}
    >
      <Image source={uri ? { uri } : image} style={tw`w-full h-[140px] rounded-t-lg`} resizeMode="cover" />
      <Text numberOfLines={1} style={tw`text-xl m-2`}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}
