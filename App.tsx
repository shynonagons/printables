import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import PrintProvider from './context/PrintProvider';
import tw from './lib/tailwind';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import toast from './config/toast';
import Toast from 'react-native-toast-message';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  useDeviceContext(tw);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PrintProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </PrintProvider>
        <Toast config={toast} />
      </SafeAreaProvider>
    );
  }
}
