import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// This screens
import AuthLoading from './app/screens/authloading';
import Login from './app/screens/login';
import Search from './app/screens/search';
import Car from './app/screens/car';
import Change from './app/screens/change';
import Verify from './app/screens/verify';
import Camera from './app/screens/camera';
import Scanner from './app/screens/scanner';
import Finalize from './app/screens/finalize';

// This header sign in user and side navbar menu
import HeaderBar from './app/components/helpers/header-bar';
import SideMenu from './app/components/helpers/side-menu';

import colors from './app/constants/colors';

const ex = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
const width = (ex.width >= 768 && ex.height >= 1024) ? wp('80%') : wp('62%');
const height = (ex.width >= 768 && ex.height >= 1024) ? hp('15%') : hp('10%');
const fs = (ex.width >= 768 && ex.height >= 1024) ? hp('10%') : hp('5%');

const AppHomeStack = createStackNavigator(
  {
    // This screens components
    Search: Search,
    Car: Car,
    Change: Change,
    Verify: Verify,
    Camera: Camera,
    Scanner: Scanner,
    Finalize: Finalize
  },
  {
    // Initial Screen component
    initialRouteName: 'Search',
    // Options setup navigation
    navigationOptions: ({ navigation }) => {
      const { params } = navigation.state;
      return{
        tabBarLabel: 'Home!',
        title: params !== undefined ? params.type_transfer : null,
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: colors.white,
          height: height,
        },
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: hp('5%'),
          width: width,
          color: colors.other_black
        },
        headerTintColor: 'green',
        // Side navbar menu
        headerLeft: <HeaderBar navigationProps={navigation} />
      }
    }
  }
);

const AppStack = createDrawerNavigator(
  {
    Application: AppHomeStack,
  },
  {
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
