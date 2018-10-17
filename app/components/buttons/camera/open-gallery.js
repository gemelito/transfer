import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class BtnOpenGallery extends React.Component {

  render() {
    return (
      <TouchableOpacity {...this.props}>
        <Ionicons
          name="md-image"
          size={40}
          color="#fff"
        />
      </TouchableOpacity>
    );
  }
}
