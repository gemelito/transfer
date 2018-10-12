import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import common from '../../constants/common';

export default class InputIcon extends Component {
  
  render() {
    const { Icon, isFocused} = this.props;

    if (Icon === 'eye_password'){
      return (
        <TouchableOpacity {...this.props}>
          {this.props.showPassword ?
            <Ionicons name="md-eye" size={30}
              style={[common.pr_10, (isFocused) ? common.text_green : common.text_black_dark]}
            />
            :
            <Ionicons name="md-eye-off" size={30}
              style={[common.pr_10, (isFocused) ? common.text_green : common.text_black_dark, (isFocused) ? common.text_green : common.text_black_dark]}
            />
          }  
        </TouchableOpacity>
      );
    } else if ( Icon === 'search') {
      return (
        <TouchableOpacity {...this.props}>
          <Ionicons name="md-search" size={30}
            style={[common.pr_10, (isFocused) ? common.text_green : common.text_black_dark]}
          />
        </TouchableOpacity>
      );
    }

  }
}