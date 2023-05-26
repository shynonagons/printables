import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as FileSystem from 'expo-file-system';

const MAX_IMAGES = 40;

export default function useSavedImages() {
  const [savedImages, setSavedImages] = useState<string[]>([]);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  useEffect(() => {
    (async () => {
      // const fromFs = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '')
      const savedKeys = (await AsyncStorage.getAllKeys()).filter((key) => key.includes('savedImage:'));
      const savedImages = await AsyncStorage.multiGet(savedKeys);
      const mappedSaves: string[] = savedImages
        .map(([key, saved]) => {
          return saved || '';
        })
        .filter((saved) => !!saved);
      setSavedImages(mappedSaves);
    })();
  }, []);

  const add = async (fileUri: string) => {
    if (savedImages.length >= MAX_IMAGES) return Toast.show({ type: 'warning', text1: 'Too many saved photos!' });
    const filepathArr = fileUri.split('/');
    const filename = filepathArr[filepathArr.length - 1];
    setSavedImages((prev) => [fileUri, ...prev]);
    return AsyncStorage.setItem(`savedImage:${filename}`, fileUri);

    const callback = (dp: any) => {
      const progress = dp.totalBytesWritten / dp.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      fileUri,
      FileSystem.documentDirectory + filename,
      {},
      callback,
    );

    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished downloading to ', uri);
    } catch (e) {
      console.error(e);
    }
  };
  const remove = async (name: string) => {
    //TODO
  };
  return { savedImages, downloadProgress, add, remove };
}
