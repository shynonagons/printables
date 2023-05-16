import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import useRecentSearches from '../hooks/useRecentSearches';
import { View } from './Themed';
import tw from '../lib/tailwind';

export default function SearchInput() {
  const navigation = useNavigation();
  const recentSearches = useRecentSearches();
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangeText = (value: string) => setSearchTerm(value);
  const doSearch = async () => {
    if (!searchTerm) return;
    await recentSearches.add(searchTerm);
    navigation.navigate('SearchResults', { searchTerm });
  };

  return (
    <View style={tw`relative`}>
      <TextInput
        style={tw`relative border-4 border-blue rounded-full py-[20px] px-[100px] my-2 min-w-[90%] text-[36px] text-blue`}
        placeholder="Search"
        onChangeText={handleChangeText}
        onSubmitEditing={doSearch}
      />
      <EvilIcons size={64} name="search" style={tw`absolute left-[20px] top-[26px] text-blue`} />
      {searchTerm.length > 0 && (
        <Pressable onPress={doSearch} style={styles.goIcon}>
          <EvilIcons size={64} name="arrow-right" style={tw`text-blue`} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  goIcon: {
    position: 'absolute',
    right: 20,
    top: 26,
  },
});
