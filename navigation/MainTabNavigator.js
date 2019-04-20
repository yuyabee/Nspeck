import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import CreateScreen from '../screens/CreateScreen';
import InspectionScreen from '../screens/InspectionScreen';
import ListHomeScreen from '../screens/ListHomeScreen';
import HouseScreen from '../screens/HouseScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'list'
          : 'md-list'
      }
    />
  ),
};

const ListHomeStack = createStackNavigator({
  ListHome: ListHomeScreen,
  House: HouseScreen,
  Inspection: CreateScreen,
});

ListHomeStack.navigationOptions = {
  tabBarLabel: 'List',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-list'
          : 'md-list'
      }
    />
  ),
};

const CreateStack = createStackNavigator({
  Create: CreateScreen,
  Inspection: InspectionScreen,
});

CreateStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
    />
  ),
};

export default createBottomTabNavigator({
  ListHomeStack,
  CreateStack,
});
