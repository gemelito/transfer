import React, { Component } from 'react';
// import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

// This screens
import Login from './app/components/login';
import Search from './app/components/search';
import Car from './app/components/car';
import Change from './app/components/change';

// This header sign in user and side navbar menu
import TouchableMenuIcon from './app/components/header';
import SideMenu from './app/components/side-menu';

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
      headerLeft: <TouchableMenuIcon navigationProps={ navigation }/>
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