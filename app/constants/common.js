import {
  StyleSheet
} from 'react-native';

import Colors from './colors';


const common = StyleSheet.create({
	bold: {
    fontWeight: 'bold'
  },
  bg_yellow: {
    backgroundColor: Colors.yellow
  },
  bg_white: {
    backgroundColor: Colors.white
  },
  bg_other_black: {
    backgroundColor: Colors.other_black
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
  },
  border_yellow: {
    borderColor: Colors.yellow
  },
  border_black_dark: {
    borderColor: Colors.black_dark
  },
  border_other_black: {
    borderColor: Colors.other_black
  },
  border_black_light: {
    borderColor: Colors.black_light
  },
  border_valid: {
    borderColor: Colors.green
  },
  border_invalid: {
    borderColor: Colors.red,
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  flex_1: {
    flex: 1
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

  /** Margins **/
  ml_10: {
    marginLeft: 10
  },
  mt_10: {
    marginTop: 10
  },
  mr_10: {
    marginRight: 10
  },

  row: {
    flexDirection: 'row'
  },

  /** Aligns **/
  text_center: {
    alignItems: 'center'
  },
  text_green: {
    color: Colors.green
  },
  text_red: {
    color: Colors.red
  },
  text_black: {
    color: Colors.black
  },
  text_black_dark: {
    color: Colors.black_dark
  },

  /** Size **/
  fs_16: {
    fontSize: 16
  },

  w_100: {
    width: '100%'
  },

});

export default common;
