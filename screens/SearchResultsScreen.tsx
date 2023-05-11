import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, Pressable, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather, Ionicons } from '@expo/vector-icons';
import { SelectScreenParamList } from '../types';
import { usePrintContext } from '../context/PrintProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '../components/Themed';
import LoadingOverlay from '../components/LoadingOverlay';
import { colors } from '../constants/Colors';

const filters = [
  {
    name: 'coloring pages',
    uri: 'https://icons.iconarchive.com/icons/google/noto-emoji-objects/1024/62913-crayon-icon.png',
  },
  { name: 'lego coloring pages', uri: 'https://webstockreview.net/images/lego-clipart-head-lego-12.png' },
  { name: 'color by number', uri: 'https://cdn3s.iosnoops.com/wp-content/uploads/appsicons/1317978215x356.jpg' },
  { name: 'connect the dots', uri: 'https://cdn.onlinewebfonts.com/svg/img_463121.png' },
  { name: 'activity', uri: 'https://cdn.onlinewebfonts.com/svg/img_167377.png' },
].map((i, index) => ({ ...i, key: index }));

export default function SearchResultscreen({
  route: { params },
  navigation,
}: StackScreenProps<SelectScreenParamList, 'SearchResultsScreen'>) {
  const [currentUri, setCurrentUri] = React.useState('');
  const [currentFilter, setCurrentFilter] = React.useState(filters[0].name);

  const { handlePrint } = usePrintContext();

  const handleWebViewNavigationStateChange = ({ url }: any) => {
    if (url.includes('iai=')) {
      const fileUri = url.split('iai=')[1];
      setCurrentUri(decodeURIComponent(fileUri));
    }
  };
  const displayName = params.name ?? params.searchTerm;
  const filterText = `${currentFilter.replace(/\s/g, '+')}+printable`;
  const nameText = params.searchTerm ? params.searchTerm.replace(/\s/g, '+') : params.name.replace(/\s/g, '+');
  const searchURL = `https://safe.duckduckgo.com/?q=${filterText}${nameText}&atb=v262-1&iax=images&ia=images`;

  const disabled = !currentUri;

  return (
    <SafeAreaView style={styles.contentContainer}>
      <View style={styles.menuContainer}>
        <Pressable onPress={navigation.goBack} style={styles.backButton}>
          <Feather name="chevron-left" size={48} color="white" />
        </Pressable>
        <View style={{ flexDirection: 'row' }}>
          {filters.map((filter) => (
            <TouchableOpacity
              style={[styles.filterIcon, currentFilter === filter.name ? styles.selectedFilterIcon : null]}
              onPress={() => setCurrentFilter(filter.name)}
            >
              <Image source={{ uri: filter.uri }} style={styles.filter} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.searchText}>
          {displayName} {currentFilter}
        </Text>
      </View>
      <WebView
        style={styles.webviewContainer}
        originWhitelist={['*']}
        source={{ uri: searchURL }}
        onNavigationStateChange={handleWebViewNavigationStateChange}
        renderLoading={() => <LoadingOverlay />}
      />
      <TouchableOpacity
        style={[styles.printButton, disabled && styles.disabledButton]}
        disabled={disabled}
        onPress={() => handlePrint(currentUri)}
      >
        <Ionicons name="print" size={36} color="white" />
        <Text style={styles.printButtonText}>Print!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  webviewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: -140,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingLeft: 50,
  },
  backButton: {
    padding: 2,
    borderRadius: 100,
    backgroundColor: '#66ABFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchText: {
    fontSize: 28,
    marginLeft: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  filterIcon: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.blue,
    backgroundColor: 'white',
    padding: 8,
    margin: 10,
  },
  selectedFilterIcon: {
    borderWidth: 3,
    borderColor: 'green',
    backgroundColor: '#45cc30',
  },
  printButton: {
    padding: 30,
    backgroundColor: '#45cc30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  printButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  filter: {
    width: 40,
    height: 40,
  },
});
