import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Image
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import Buttons from '../components/buttons/button';

import Colors from '../constants/colors';
import common from '../constants/common';
import API from '../constants/base_url';

const CAR = require('../../assets/car.png');

const EMPTY = require('../../assets/square-empty.png');
const FILLED = require('../../assets/square-filled.png');

export default class Search extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      num_economic: '',
      model: '',
      fuel: '',
      quanty: [1,2,3,4,5,6,7,8],
      kms: '',
    }
  }

  componentDidMount() {
    this._loadInitialState().done();

    // console.log(this.state.quanty.length);
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
          num_economic: car_json.Car.EconomicNumber,
          model: car_json.Car.Name,
          fuel: car_json.Car.Fuel,
          kms: car_json.Car.Kms,
          // color: car_json.Car.Color
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
    const { num_economic, model, fuel, kms, quanty } = this.state;
    // console.log(quanty);
    const rendeFuel = quanty.map((quanty, index) => {
      if (quanty <= fuel) {
        return(<Image source={FILLED} style={[common.mr_5]} key={index}/>);
      }
      return (<Image source={EMPTY} style={[common.mr_5]} key={index}/>);
    });

    return (
      <KeyboardAvoidingView style={[common.flex_1, common.bg_white]} behavior="padding" enabled>

          <View style={[common.text_center, common.pb_10, common.mt_10]}>
            <Text style={[common.h1, common.text_other_black]}>Verificar Kilometraje y Gasolina</Text>
          </View>

          {/* Container information */}
          <View>
            {/* Carro */}
            <View style={[common.bg_light,common.display_flex,common.row,common.ml_10,common.mr_10,common.mb_10,]}>
              <View style={[common.pl_10, common.pt_10]}>
                <Image
                  source={CAR}
                  style={[common.mt_10, common.mb_10, common.pr_10]}
                />
                {/* <Ionicons name="md-car" size={60} style={[common.pt_10, common.pb_10, common.pr_10, common.text_black_dark]}/> */}

              </View>

              <View style={[common.pl_10, common.pt_10, common.mb_10]}>
                <Text style={[common.h2, common.bold, common.text_other_black]}>{num_economic}</Text>
                <Text style={[common.fs_18, common.text_other_black]}>{model}</Text>
              </View>
            </View>
            {/* Carro */}

            {/* informacion del carro */}
            <View style={[common.display_flex,common.row,common.space_between,common.w_100,common.pb_20]}>

              <View style={[common.bg_light, common.ml_10, common.pl_10, common.pt_10, common.pb_10, common.w_45]}>

                <View style={common.row}>
                  <View style={[common.left, common.w_45]}>
                    <Text style={[common.h2, common.text_other_black, common.bold]}>KM</Text>
                  </View>
                  <View style={[common.right, common.w_45]}>
                    <Ionicons name="md-search" size={30} style={[common.text_other_black]} />
                  </View>
                </View>
                <Text style={[common.h2, common.text_black_dark, common.bold]}>{kms}</Text>
              </View>

              <View style={[common.bg_light, common.mr_10, common.pl_10, common.pt_10, common.pb_10, common.w_45]}>

                <View style={common.row}>
                  <View style={[common.left, common.w_45]}>
                    <Text style={[common.h2, common.text_other_black, common.bold]}>GAS</Text>
                  </View>
                  <View style={[common.right, common.w_45]}>
                    <Ionicons name="md-search" size={30} style={[common.text_other_black]} />
                  </View>
                </View>
                {/* <Text style={[common.h2, common.text_black_dark, common.bold]}>20,017</Text> */}
                <View style={[common.row, common.mt_10, {height:30}]}>
                  {rendeFuel}
                </View>
              </View>

            </View>
            {/* informacion del carro */}

            {/* camera */}
            <View style={[common.bg_light, common.mr_10, common.pl_10, common.pt_10, common.pb_10, common.ml_10, common.mr_10, {height:150}]}>
            <View style={[ common.center, {
              flex: 2,
              // backgroundColor: '#fff',
              alignItems: 'center',
          
              justifyContent: 'center',} ]}>
              {/* <View style={[common.text_other_black, common.border_yellow, { position: 'absolute'}]}> */}
                <Ionicons name="md-camera" size={30} style={[common.text_white,  { position: 'absolute', borderColor:"white", borderWidth:1, borderRadius:100, paddingLeft:15, paddingRight:15, paddingTop:10 ,paddingBottom: 10, backgroundColor:'rgba(0,0,0,0.5)', marginTop:20 }]}/>

                {/* </View> */}
              </View>
            </View>
            {/* camera */}

          </View>
          {/* Container information */}

          {/* Botones */}
          <View
            style={[
              common.display_flex,
              common.row,
              common.absolute,
              common.space_between,
              common.w_100,
              common.bottom_0,
              common.pb_20,
            ]}
          >
            <View style={[common.w_45_btn, common.ml_10]}>
              <Buttons
                borderColor={common.border_green}
                bg={common.bg_transparent}
                textLabel="REGRESAR"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>
            <View style={[common.w_45_btn, common.mr_10]}>
              <Buttons
                borderColor={common.bg_yellow}
                bg={common.border_yellow}
                textLabel="SIGUIENTE"
                onPress={() => this.props.navigation.navigate('Change', {
                  SessionId: this.state.SessionId,
                }
                )}
              />
            </View>
          </View>
          {/* Botones */}


      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: .5,
    flexDirection: 'row',
    alignItems: 'flex-start' //replace with flex-end or center
  },

  box1: {
    backgroundColor: '#2196F3'
  },
  box2: {
    backgroundColor: '#8BC34A'
  },

});