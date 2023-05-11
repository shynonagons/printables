import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import useRecentSearches from '../hooks/useRecentSearches';
import { View } from './Themed';
import tw from '../lib/tailwind';

const SEARCH_COLOR = '#437af9';

export default function SearchInput() {
  const navigation = useNavigation();
  const recentSearches = useRecentSearches();
  const [searchTerm, setSearchTerm] = useState('');
  const handleChangeText = (value: string) => setSearchTerm(value);
  const doSearch = async () => {
    if (!searchTerm) return;
    await recentSearches.add(searchTerm);
    navigation.navigate('SearchResultsScreen', { searchTerm });
  };

  return (
    <View style={tw`relative`}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={handleChangeText}
        onSubmitEditing={doSearch}
      />
      <EvilIcons size={64} name="search" style={styles.searchIcon} />
      {searchTerm.length > 0 && (
        <Pressable onPress={doSearch} style={styles.goIcon}>
          <EvilIcons size={64} name="arrow-right" style={{ color: SEARCH_COLOR }} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    position: 'relative',
    borderWidth: 3,
    borderColor: SEARCH_COLOR,
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 100,
    marginVertical: 10,
    minWidth: '90%',
    fontSize: 32,
    color: SEARCH_COLOR,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
    top: 26,
    color: SEARCH_COLOR,
  },
  goIcon: {
    position: 'absolute',
    right: 20,
    top: 26,
  },
});
