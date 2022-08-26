import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useRecentSearches from '../hooks/useRecentSearches';
import { Text } from './Themed';

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
  const [isOpen, setIsOpen] = useState(true);
  const recentSearches = useRecentSearches();
  const animHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const asyncGetRecents = async () => {
      const stored = await recentSearches.get();
      setRecents(stored);
      Animated.timing(animHeight, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    };
    void asyncGetRecents();
  }, []);

  const handleToggleContainer = () => {
    const toValue = isOpen ? 0 : 300;
    Animated.timing(animHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const iconName = isOpen ? 'chevron-up' : 'chevron-down';
  return recents.length > 0 ? (
    <Animated.View style={styles.recentSearchContainer}>
      <Pressable
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}
        onPress={handleToggleContainer}
      >
        <Text style={styles.headerText}>Recent Searches</Text>
        <EvilIcons name={iconName} size={64} />
      </Pressable>

      <Animated.View style={[{ height: animHeight }]}>
        <FlatList data={recents} renderItem={({ item }) => <RecentSearch name={item} />} />
      </Animated.View>
    </Animated.View>
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
