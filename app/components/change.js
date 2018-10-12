import React from 'react';
import {
  StyleSheet,
  View,
  Picker,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import Colors from '../constants/colors';



export default class Change extends React.Component {

  constructor(props){
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <View style={[styles.flex_1, styles.bg_white]}>

        <View style={[styles.ml_10, styles.mr_10]}>
          <Text style={[
            styles.text_center, 
            styles.h1, 
            styles.text_other_black, 
            styles.pt_10, 
            styles.pb_10,
            styles.text_other_black
          ]}>Seleccione oficina de origen</Text>

          <View style={[styles.border, styles.mb_10, styles.border_dark,]}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java"  color={Colors.black}/>
              <Picker.Item label="JavaScript" value="js" color={Colors.black}/>
            </Picker>
          </View>

          <View style={[styles.border, styles.border_dark]}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          {/* First section select */}

          <Text style={[
            styles.text_center, 
            styles.h1, 
            styles.text_other_black, 
            styles.pt_10, 
            styles.pb_10,
            styles.mt_10,
            styles.text_other_black
          ]}>Seleccione oficina de destino</Text>
          <View style={[styles.border, styles.mb_10, styles.border_dark]}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          <View style={[styles.border, styles.border_dark]}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
          {/* Second section select */}

        </View>
        {/* Container section selectors */}

        <View style={[styles.display_flex, styles.row, styles.absolute, styles.w_100, styles.bottom_0, styles.space_between, styles.pb_20]}>

            <View style={[styles.w_45, styles.ml_10]}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                <View style={[styles.border, styles.border_green, styles.pt_10, styles.pb_10, styles.text_center, ]}>
                  <Text style={[styles.text_black, styles.bold]}>
                    REGRESAR
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={[styles.w_45, styles.mr_10]}>
              <TouchableWithoutFeedback>
                <View style={[styles.border, styles.border_yellow, styles.bg_yellow, styles.pt_10,  styles.pb_10, styles.text_center, ]}>
                  <Text style={[styles.text_black, styles.bold]}>
                    SIGUIENTE
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

        </View>
        {/* Botones */}

      </View>
      // Main containter
    );
  }
}

const styles = StyleSheet.create({

  btn: {
    width: 165,
    borderWidth: 1,
    borderRadius: 5,
  },

  border: {
    borderWidth: 1,
    borderRadius: 5,
  },

  bold: {
    fontWeight: 'bold'
  },
  border_dark: {
    borderColor: Colors.black_dark
  },
  border_black: {
    borderColor: Colors.black
  },
  border_other_black:{
    borderColor: Colors.other_black
  },
  border_green: {
    borderColor: Colors.green,
  },
  border_yellow: {
    borderColor: Colors.yellow,
  },
  bg_white: {
    backgroundColor: Colors.white
  },
  bg_light: {
    backgroundColor: Colors.black_light
  },
  bg_yellow: {
    backgroundColor: Colors.yellow
  },
  bottom_0: {
    bottom: 0
  },

  flex_1: {
    flex: 1
  },
  display_flex:{
    display:'flex'
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
    fontSize: 24
  },
  h2: {
    fontSize: 20
  },
  h3: {
    fontSize: 18
  },



  mt_10: {
    marginTop: 10
  },
  mb_10: {
    marginBottom: 10
  },
  ml_10: {
    marginLeft: 10
  },
  mr_10: {
    marginRight: 10
  },


  pl_10: {
    paddingLeft: 10
  },
  pt_10: {
    paddingTop: 10
  },
  pt_5: {
    paddingTop: 5
  },
  pb_10: {
    paddingBottom: 10
  },
  pb_20: {
    paddingBottom: 20
  },

  absolute: {
    position: 'absolute'
  },

  text_center: {
    alignItems: 'center',
  },
  text_black: {
    color: Colors.black
  },
  text_other_black: {
    color: Colors.other_black
  },
  text_black_dark: {
    color: Colors.black_dark
  },

  w_45: {
    width: '45%'
  },
  w_100: {
    width: '100%'
  }
});
