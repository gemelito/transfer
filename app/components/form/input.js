import React, { Component } from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import common from '../../constants/common';

export default class Input extends Component {

	constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      showPassword: true
    }
  }
  
  onFocusChange = () => {
    this.setState({
      isFocused: true
    });
  }

  handleChangeText = (text, field) => {

    this.onFocusChange();
  }

  togglePassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

	render() {
		return (
      <View 
        style={[
          common.border, common.pt_10, common.pb_10, common.pl_10,
          (this.props.input_icon) ? styles.input_icon: '',
          (this.props.have_top) ? common.mt_10: '',

          this.props.inValid ? common.border_invalid : (this.state.isFocused) ? common.border_valid : common.border_black_dark
        ]}
      >
        <TextInput
          style={[
            common.fs_16, common.text_black, { width: 350 },
            (this.props.input_icon) ? {flex:1}: ''
          ]}
          placeholder={this.props.placeholder ? this.props.placeholder: 'No tiene placeholder'}
          underlineColorAndroid="transparent"
          onFocus={this.onFocusChange}
          onChangeText={ this.handleChangeText }
          secureTextEntry={this.props.password ? this.state.showPassword: false}
          // {...this.props}
        />
        { this.props.input_icon &&
          <TouchableOpacity
            onPress={this.togglePassword}
          >
            { this.state.showPassword ?
              <Ionicons name="md-eye" size={30}
                style={[common.pr_10, (this.state.isFocused) ? common.text_green: common.text_black_dark]}
              />
              :
              <Ionicons name="md-eye-off" size={30}
                style={[common.pr_10, (this.state.isFocused) ? common.text_green: common.text_black_dark]}
              />
            }
          </TouchableOpacity>
        }
      </View>
		);
	}
}

const styles = StyleSheet.create({
  input_icon: {
    flexDirection: 'row',
  },
});
