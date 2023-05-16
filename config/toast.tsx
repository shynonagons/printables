import React from 'react';
import { Pressable } from 'react-native';
import { BaseToastProps } from 'react-native-toast-message';
import type { ReactNode } from 'react';
import tw from '../lib/tailwind';
import { Text, View } from '../components/Themed';
import { EvilIcons } from '@expo/vector-icons';
import { colors } from '../constants/Colors';

const typeMap = {
  success: {
    color: colors.green,
    iconName: 'check',
  },
  info: {
    color: colors.blue,
    iconName: 'question',
  },
  warning: {
    color: colors.yellow,
    iconName: 'exclamation',
  },
  error: {
    color: colors.red,
    iconName: 'close',
  },
};

type CustomToastProps = BaseToastProps & { type: keyof typeof typeMap; props?: any };

const Container = ({ type, text1, onPress, props }: CustomToastProps) => {
  const { color, iconName } = typeMap[type];
  const bgColor = `bg-[${color}]`;

  return (
    <View style={tw`w-full mt-2`}>
      <Pressable
        onPress={onPress}
        style={tw.style(
          `flex-row justify-center items-center rounded-[14px] border border-white border-[3px] px-5 py-8 m-4`,
          bgColor,
        )}
      >
        <EvilIcons name={iconName} color={'white'} size={48} />

        <View style={tw`flex-1 justify-center`}>
          <Text style={tw`text-white text-[32px] text-center`}>{text1}</Text>
        </View>
        <View style={tw`w-[30px] ml-4`} />
      </Pressable>
    </View>
  );
};

export default {
  success: (props: BaseToastProps) => <Container {...props} type="success" />,
  info: (props: BaseToastProps) => <Container {...props} type="info" />,
  warning: (props: BaseToastProps) => <Container {...props} type="warning" />,
  error: (props: BaseToastProps) => <Container {...props} type="error" />,
};
