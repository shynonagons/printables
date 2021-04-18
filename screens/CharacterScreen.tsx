import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { SelectScreenParamList } from '../types';
import usePrint from '../hooks/usePrint'

const filters = [{name: 'default', uri: 'https://maxcdn.icons8.com/Share/icon/Cinema/avengers1600.png'}, {name: 'lego', uri: 'https://maxcdn.icons8.com/Share/icon/color/Gaming/lego_head1600.png'}, {name: 'cute', uri: 'https://pngbas.com/images/bt/cute-captain-america-clipart-3.png'}].map((i, index) => ({...i, key: index}))
export default function CharacterScreen({
  route: {params},
}: StackScreenProps<SelectScreenParamList, 'CharacterScreen'>) {
    const [currentUri, setCurrentUri] = React.useState('')
    const [currentFilter, setCurrentFilter] = React.useState('default')

    const { handlePrint } = usePrint();

    const handleWebViewNavigationStateChange = ({url}: any) => {
        if (url.includes('iai=')) {
            const fileUri = url.split('iai=')[1];
            setCurrentUri(decodeURIComponent(fileUri))
        }
    }

    const filterText = currentFilter === 'default' ? '' : `${currentFilter}+`;
    const nameText = params.searchTerm ? params.searchTerm.replace(/\s/g, '+') : params.name.replace(/\s/g, '+');
    const searchURL = `https://duckduckgo.com/?q=${filterText}${nameText}+coloring+page&atb=v262-1&iax=images&ia=images`
  return (
      <>
      <FlatList style={styles.filters} data={filters} numColumns={filters.length} renderItem={({item}) => <TouchableOpacity style={[styles.filterIcon, currentFilter === item.name ? styles.selectedFilterIcon : null]} onPress={() => setCurrentFilter(item.name)}><Image source={{uri: item.uri}} style={styles.filter} /></TouchableOpacity>} />
    <WebView style={styles.container} originWhitelist={['*']}
    source={{ uri: searchURL }}
    onNavigationStateChange={handleWebViewNavigationStateChange}
    >

    </WebView>
    <TouchableOpacity style={styles.printButton} disabled={!currentUri} onPress={() => handlePrint(currentUri)}><Text style={styles.printButtonText}><Ionicons name='print' size={32}/>  Print!</Text></TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  filters: {
      maxHeight: 80,
  },
  filterIcon: {
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'blue',
      backgroundColor: 'white',
      margin: 10,
  },
  selectedFilterIcon: {
    borderWidth: 3,
    borderColor: 'green',
    backgroundColor: '#45cc30'
  },
  printButton: {
      padding: 30,
      backgroundColor: '#45cc30',
      alignItems: 'center'
  },
  printButtonText: {
    fontSize: 24,
    color: 'white',
  },
  filter: {
    width: 60,
    height: 60,
  }
});
