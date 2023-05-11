import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SelectScreen from '../screens/SelectScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import { BottomTabParamList, SelectScreenParamList } from '../types';
import CustomScreen from '../screens/CustomScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator initialRouteName="SelectNavigator">
      <BottomTab.Screen
        name="SelectNavigator"
        component={SelectNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-create" color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="CustomScreen"
        component={CustomScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-book" color={color} />,
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const SelectStack = createStackNavigator<SelectScreenParamList>();

function SelectNavigator() {
  return (
    <SelectStack.Navigator>
      <SelectStack.Screen name="SelectScreen" component={SelectScreen} options={{ headerShown: false }} />
      <SelectStack.Screen name="SearchResultsScreen" component={SearchResultsScreen} options={{ headerShown: false }} />
    </SelectStack.Navigator>
  );
}
