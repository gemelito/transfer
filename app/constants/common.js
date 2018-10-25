import {
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Colors from './colors';


const common = StyleSheet.create({
  absolute: {
    position: 'absolute'
  },
	bold: {
    fontWeight: 'bold'
  },
  bottom_0:{
    bottom:0
  },
  bg_transparent: {
    backgroundColor: 'transparent'
  },
  bg_green: {
    backgroundColor: Colors.green
  },
  bg_light: {
    backgroundColor: Colors.black_light
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
  border_green:{
    borderColor: Colors.green
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
  flex_2: {
    flex: 2
  },
  display_flex: {
    display: 'flex'
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  space_between: {
    justifyContent: 'space-between'
  },
  h1: {
    fontSize: hp('5%')
  },
  h2: {
    fontSize: hp('4%')
  },
  h3: {
    fontSize: hp('3%')
  },

  pad_l_10: {
    paddingLeft: 10
  },
  pad_r_10: {
    paddingRight: 10
  },
  pl_10: {
    paddingLeft: hp('5%')
  },
  pt_10: {
    paddingTop: hp('2%'),
  },
  pr_10: {
    paddingRight: hp('5%')
  },
  pb_10: {
    paddingBottom: hp('2%'),
  },
  pb_20: {
    paddingBottom: 20
  },

  /** Margins **/
  ml_10: {
    marginLeft: 10
  },
  mt_10: {
    marginTop: 10
  },
  mr_5: {
    marginRight: 5
  },
  mr_10: {
    marginRight: 10
  },
  mb_10: {
    marginBottom: 10
  },

  row: {
    flexDirection: 'row'
  },

  /** Aligns **/
  text_center: {
    textAlign: 'center'
  },
  left: {
    alignItems: 'flex-start'
  },
  right: {
    alignItems: 'flex-end'
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
  text_other_black: {
    color: Colors.other_black
  },
  text_white: {
    color: Colors.white
  },
  

  /** Size **/
  fs_16: {
    fontSize: 16
  },
  fs_18: {
    fontSize: 18
  },

  w_25: {
    width: wp('25%')
  },
  w_35: {
    width: wp('32%')
  },
  w_45: {
    width: wp('45%')
  },
  w_45_btn: {
    width: wp('45%')
  },
  w_75: {
    width: wp('75%')
  },
  w_100: {
    width: wp('100%')
  },

  h_image: {
    height: hp('24%')
  }

});

export default common;
