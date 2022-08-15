import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useRecentSearches from '../hooks/useRecentSearches';
import { Text, View } from './Themed';

const RecentSearch = ({ name }) => {
  const navigation = useNavigation();
  const handlePressSearchRow = () => {
    navigation.navigate('CharacterScreen', { name });
  };
  return (
    <Pressable onPress={handlePressSearchRow} style={styles.recentRow}>
      <Text style={styles.resultText}>{name}</Text>
      <EvilIcons name="arrow-right" size={48} />
    </Pressable>
  );
};

export default function RecentSearches() {
  const [recents, setRecents] = useState([]);
  const recentSearches = useRecentSearches();

  useEffect(() => {
    const asyncGetRecents = async () => {
      const stored = await recentSearches.get();
      setRecents(stored);
    };
    void asyncGetRecents();
  }, []);
  return recents.length > 0 ? (
    <View style={styles.recentSearchContainer}>
      <Text style={styles.headerText}>Recent Searches</Text>
      <FlatList data={recents} renderItem={({ item }) => <RecentSearch name={item} />} />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  recentSearchContainer: {
    width: '90%',
    marginVertical: 10,
    padding: 30,
    paddingTop: 10,
    borderWidth: 1,
    borderRadius: 30,
  },
  headerText: { fontSize: 32, fontWeight: 'bold' },
  resultText: { fontSize: 28, marginRight: 10 },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
});
