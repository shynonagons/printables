import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import tw from '../lib/tailwind';
import useSavedImages from '../hooks/useSavedImages';

export default function ImagePicker() {
  const { add } = useSavedImages();
  const launchCamera = async () => {
    await ExpoImagePicker.requestCameraPermissionsAsync();
    let result = await ExpoImagePicker.launchCameraAsync();
    if (!result.canceled) {
      add(result.assets[0].uri);
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.canceled) {
      add(result.assets[0].uri);
    }
  };

  const handlePress = () => {
    Alert.alert('Hi', 'Stuff', [
      {
        text: 'Take a Photo',
        onPress: launchCamera,
      },
      {
        text: 'Choose an image',
        onPress: pickImage,
      },
    ]);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={handlePress} style={tw`rounded-full p-5 bg-green`}>
        <Feather name="camera" size={48} color="white" />
      </Pressable>
    </View>
  );
}
