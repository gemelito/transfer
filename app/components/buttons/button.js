import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Colors from '../../constants/colors';

export default class Buttons extends Component {
	render() {
		return (
			<TouchableOpacity
				style={[
					styles.border,
					styles.w_100,
					styles.bg_yellow,
					styles.border_yellow,
					styles.pt_10,
					styles.pb_10,
					styles.text_center,
					styles.mt_10
				]}
				activeOpacity={0.7}
				onPress={handleValidate}
			>
					<Text style={[styles.text_black, styles.fs_16, styles.bold]}>
						{/* { this.state.is_loading ? 'loading...' : 'Iniciar sesion'} */}
						INGRESAR
					</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	bold:{
		fontWeight: 'bold'
	},
	bg_yellow:{
		backgroundColor: Colors.yellow
	},
  border: {
    borderWidth: 1,
    borderRadius: 5,
	},
	border_yellow: {
		borderColor: Colors.yellow
	},
	
  pl_10: {
    paddingLeft: 10
  },
  pt_10: {
    paddingTop: 10,
  },
  pr_10: {
    paddingRight: 10
  },
  pb_10: {
    paddingBottom: 10,
  },

  ml_10: {
    marginLeft: 10
  },
  mt_10: {
    marginTop: 10
  },
  mr_10: {
    marginRight: 10
  },

	text_center:{
		alignItems: 'center'
	},
  text_black: {
    color: Colors.black
  },

  /** Size **/
  fs_16: {
    fontSize: 16
  },

  w_100: {
    width: '100%'
  },

});
