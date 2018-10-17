import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BtnReverseCamera extends React.Component {

  render() {
    return (
      <TouchableOpacity { ...this.props }>
        <Ionicons
          name="ios-reverse-camera"
          size={40}
          color="#fff"
        />
      </TouchableOpacity>
    );
  } 
}


