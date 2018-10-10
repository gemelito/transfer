import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  AsyncStorage,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import API from '../constants/base_url';


export default class Car extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type_transfer', 'A Nested Details Screen'),
      headerBackTitle: null,
      headerStyle: {
        // backgroundColor: '#0D2143',
        // position: 'absolute',
        // height: 50,
        // top: 0,
        // left: 0,
        // right: 0,
      },
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '70%',
        color: Colors.other_black
      },
      // headerTintColor: 'green',
    };
  };

  constructor(props){
    super(props);
    this.state = {
      num_economic: '',
      model: '',
      version: '',
      plate: '',
      color: ''
    }
  }

  componentDidMount(){
    this._loadInitialState().done();
  }

  // This method is load then finished, this componente
  _loadInitialState = async () => {
    try {
      // Get data of user, if existe any.
      const car = await AsyncStorage.getItem('car');
      // If existe change to creen
      if (car !== null) {
        let car_json = JSON.parse(car);
        this.setState({ 
          num_economic  : car_json.Car.EconomicNumber,
          model         : car_json.Car.Name,
          version       : car_json.Car.ModelVersion,
          plate         : car_json.Car.PlateNumber,
          color         : car_json.Car.Color
        });
      }
    } catch (error) {
      alert(error);
      // Return to search the state every second
      setInterval(() => {
        this.props.navigation.goBack()
      }, 5000);
    }
  }

  render() {
    return (
      <View style={[styles.flex_1, styles.bg_white]}>
        <View style={[styles.text_center, styles.pt_10, styles.pb_10]}>
          <Text style={[styles.h1, styles.text_other_black,]}>Verifique la información del auto</Text>
        </View>

        <View style={[styles.bg_light, styles.ml_10, styles.mt_10, styles.mr_10, styles.pb_10]}>
          <Text style={[styles.h2, styles.text_black_dar, styles.pl_10, styles.pt_10, styles.pb_10, styles.bold]}>DATOS DEL AUTO</Text>

          <View style={{flexDirection: 'row'}}>
          
            <View style={{width: 160, paddingLeft:10}}>
              <Text style={[styles.h3, styles.text_other_black]}>No. Económico:</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>Modelo:</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>Version:</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>Placas:</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>Color:</Text>
            </View>
            <View style={{width: 200, paddingRight:10}}>
              <Text style={[styles.h3, styles.text_other_black]}>{this.state.num_economic}</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>{this.state.model}</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>{this.state.version}</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>{this.state.plate}</Text>
              <Text style={[styles.h3, styles.pt_5, styles.text_other_black]}>{this.state.color}</Text>
            </View>
          </View>
          
        </View>
        {/* Container information */}

        <View style={[styles.absolute, styles.pb_20, styles.ml_10, styles.mr_10, styles.bottom_0]}>

          <View style={{flexDirection: 'row'}}>
          
            <View>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                <View style={[styles.btn, styles.border_green, styles.pt_10, styles.mr_10, styles.pb_10, styles.text_center, ]}>
                  <Text style={[styles.text_black, styles.bold]}>
                    REGRESAR
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>

            <View>
              <TouchableWithoutFeedback>
                <View style={[styles.btn, styles.border_yellow, styles.bg_yellow, styles.pt_10, styles.mr_10, styles.pb_10, styles.text_center, ]}>
                  <Text style={[styles.text_black, styles.bold]}>
                    SIGUIENTE
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        {/* Botones */}

      </View>
      // Main
    );
  }
}

const styles = StyleSheet.create({

  btn: {
    width: 165,
    borderWidth: 1,
    borderRadius: 5,
  },

  bold: {
    fontWeight: 'bold'
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
  bg_light:{
    backgroundColor: Colors.black_light
  },
  bg_yellow: {
    backgroundColor: Colors.yellow
  },
  bottom_0: {
    bottom: 0
  },

  flex_1:{
    flex: 1
  },

  h1:{
    fontSize: 24
  },
  h2:{
    fontSize: 20
  },
  h3: {
    fontSize: 18
  },


  
  mt_10:{
    marginTop: 10
  },
  mb_10:{
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
  text_black_dar:{
    color: Colors.black_dark
  }
});
