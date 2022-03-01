import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SelectScreen from '../screens/SelectScreen';
import CharacterScreen from '../screens/CharacterScreen';
import { BottomTabParamList, SelectScreenParamList } from '../types';
import CustomScreen from '../screens/CustomScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator initialRouteName="SelectScreen" tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="SelectScreen"
        component={SelectNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-create" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="CustomScreen"
        component={CustomScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-book" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const SelectStack = createStackNavigator<SelectScreenParamList>();

function SelectNavigator() {
  return (
    <SelectStack.Navigator>
      <SelectStack.Screen name="SelectScreen" component={SelectScreen} options={{ headerTitle: 'Character' }} />
      <SelectStack.Screen name="CharacterScreen" component={CharacterScreen} options={{ headerTitle: 'Image' }} />
    </SelectStack.Navigator>
  );
}
