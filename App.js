import React, { Component } from 'react';
// import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

// This screens
import Login from './app/screens/login';
import Search from './app/screens/search';
import Car from './app/screens/car';
import Change from './app/screens/change';

// This header sign in user and side navbar menu
import HeaderBar from './app/components/helpers/header-bar';
import SideMenu from './app/components/helpers/side-menu';

// This object to create navigation
const Application = createStackNavigator(
  {
    // This screens components
    Login: Login,
    Search: Search,
    Car: Car,
    Change: Change
  },
  {
    // Initial Screen component
    initialRouteName: 'Login',  
    // Options setup navigation
    navigationOptions: ({ navigation }) => ({ 
      // Side navbar menu
      headerLeft: <HeaderBar navigationProps={ navigation }/>
    })
  }
);


export default MyDrawerNavigator = createDrawerNavigator(  
  {
    Application: Application,
  },
  {
    contentComponent: SideMenu
  }
);