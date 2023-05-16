import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useRecentSearches from '../hooks/useRecentSearches';
import { Text, View } from './Themed';
import useFavorites from '../hooks/useFavorites';
import { colors } from '../constants/Colors';
import tw from '../lib/tailwind';

const RecentSearch = ({
  name,
  favorited,
  favorite,
  unfavorite,
  remove,
}: {
  name: string;
  favorited: boolean;
  favorite: (name: string) => void;
  unfavorite: (name: string) => void;
  remove: (name: string) => void;
}) => {
  const navigation = useNavigation();
  const handlePressSearchRow = () => {
    navigation.navigate('SearchResults', { name });
  };
  const handleFavorite = () => (favorited ? unfavorite(name) : favorite(name));
  return (
    <Pressable onPress={handlePressSearchRow} style={tw`items-center p-2`}>
      <Text style={tw`text-xl mr-2`}>{name}</Text>
      <View style={tw`flex-row items-center`}>
        <Pressable onPress={handleFavorite}>
          {favorited ? <FontAwesome name="heart" size={36} color={colors.red} /> : <EvilIcons name="heart" size={48} />}
        </Pressable>
        <EvilIcons name="arrow-right" size={48} />
        {/* <Pressable onPress={() => remove(name)}>
          {<FontAwesome name="times-circle" size={36} color={colors.red} />}
        </Pressable> */}
      </View>
    </Pressable>
  );
};

export default function RecentSearches() {
  const [recents, setRecents] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const recentSearches = useRecentSearches();
  const { favorites, favorite, unfavorite } = useFavorites();
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
    <Animated.View style={tw`w-90% mt-10 p-30 pt-10 border-4 border-yellow rounded-xl`}>
      <Pressable style={tw`flex-row bg-transparent`} onPress={handleToggleContainer}>
        <Text style={tw`text-2xl`}>Recent Searches</Text>
        <EvilIcons name={iconName} size={64} />
      </Pressable>

      <Animated.View style={[{ height: animHeight }]}>
        <FlatList
          data={recents}
          renderItem={({ item }) => (
            <RecentSearch
              name={item}
              favorited={favorites.map(({ name }) => name).includes(item)}
              favorite={favorite}
              unfavorite={unfavorite}
              remove={recentSearches.remove}
            />
          )}
        />
      </Animated.View>
    </Animated.View>
  ) : null;
}
