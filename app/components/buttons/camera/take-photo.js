import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BtnTakePhoto extends React.Component {

  render() {
    return (
      <TouchableOpacity {...this.props}>
        <Ionicons
          name="ios-radio-button-on-outline"
          size={65}
          color="#fff"
        />
      </TouchableOpacity>
    );
  }
}


