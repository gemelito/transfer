import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import common from '../../constants/common';
import InputIcon from '../helpers/inputicon';

export default class InputField extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isTrue: this.props.isTrue
    }

    this.onFocusChange = this.onFocusChange.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
  }

  onFocusChange = () => {
    this.setState({
      isFocused: true
    });
  }

  togglePassword = () => { this.setState({ isTrue: !this.state.isTrue }); }

  render() {
    const { holderText, inputIcon, inputTop, isEmpty, typeIcon, inputHeight } = this.props;
    
    return (
      <View style={[
        common.border,
        common.pt_10, 
        common.pb_10, 
        common.row,

        inputTop ? common.mt_10 : '',
        // inputIcon ? common.row : '',
        
        this.state.isFocused ? common.border_valid : common.border_black_dark,
        isEmpty ? common.border_invalid : ''
      ]}>
        <TextInput
          style={[
            // common.pl_10,
            // common.pr_10,
            common.fs_16,
            common.text_black,
            common.flex_1,

            inputHeight ? { height: inputHeight } : { height:30 },

            // inputIcon ? { flex: 1 } : ''
            { paddingLeft: 10, paddingRight: 10}
          ]}

          underlineColorAndroid="transparent"
          placeholder={holderText}
          onFocus={this.onFocusChange}
          secureTextEntry={this.props.isTrue ? this.state.isTrue : false}
          {...this.props}
        />
        
        {/* Componente show icons */}
        {inputIcon &&
          <InputIcon
            Icon={typeIcon}
            showPassword={this.state.isTrue}
            isFocused={this.state.isFocused}
            onPress={this.togglePassword}
          />
        }
        {/* End Componente show icons */}

      </View>
    );
  }
}