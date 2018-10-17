import React, { Component } from 'react';
// import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

// This screens
import AuthLoading from './app/screens/authloading';
import Login from './app/screens/login';
import Search from './app/screens/search';
import Car from './app/screens/car';
import Change from './app/screens/change';
import Verify from './app/screens/verify';


// This header sign in user and side navbar menu
import HeaderBar from './app/components/helpers/header-bar';
import SideMenu from './app/components/helpers/side-menu';


const AppHomeStack = createStackNavigator(
  {
    // This screens components
    Search: Search,
    Car: Car,
    Change: Change,
    Verify: Verify
  },
  {
    // Initial Screen component
    initialRouteName: 'Verify',
    // Options setup navigation
    navigationOptions: ({ navigation }) => ({
      // Side navbar menu
      headerLeft: <HeaderBar navigationProps={navigation} />
    })
  }
);

const AppStack = createDrawerNavigator(
  {
    Application: AppHomeStack,
  },
  {
    // contentComponent: SideMenu
    contentComponent: ({ navigation }) => (
      <SideMenu navigation={navigation} />
    ),
  }
);

const AuthStack = createStackNavigator({ Login: Login });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
