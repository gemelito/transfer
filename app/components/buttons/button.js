import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';


import common from '../../constants/common';

export default class Buttons extends Component {
	render() {
    const { isLoading, bg, borderColor, twoButttons, textLabel, btnBorder, isDisabled, bgWidth } = this.props;
		return (
			<TouchableOpacity
				style={[
          common.border,
					common.pt_10,
          common.pb_10,
          // common.pl_10,
          // common.pr_10,
          // common.mt_10,
          
          // twoButttons ? common.w_45_btn : '',
          isLoading   ? ''          : '',
          bg          ? bg          : common.bg_other_black,
          borderColor ? borderColor : common.border_other_black,
          isDisabled ? { opacity: 0.5}: '',
          bgWidth ? bgWidth : ''
				]}
				activeOpacity={0.7}
				{...this.props}
			>

        <Text style={[common.text_black, common.fs_16, common.bold, common.text_center,]}>
          {textLabel}
        </Text>
			</TouchableOpacity>
		);
	}
}