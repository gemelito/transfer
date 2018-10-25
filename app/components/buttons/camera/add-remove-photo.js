import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import common from '../../../constants/common';

export default class BtnTakePhoto extends React.Component {

  render() {
    const { nameIcon } = this.props;
    return (
      <View style={[common.w_45_btn, common.mr_10, common.center]}>
        <TouchableOpacity {...this.props}>
          <Ionicons
            name={nameIcon}
            size={65}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  }
}
