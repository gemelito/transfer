import React from 'react';
import {
  View,
  AsyncStorage,
  Text,
  Dimensions
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Buttons from '../components/buttons/button';

import Colors from '../constants/colors';
import common from '../constants/common';

const ex = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}
const width = (ex.width >= 768 && ex.height >= 1024) ? wp('80%') : wp('62%');

export default class Car extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type_transfer', 'RECIBIR'),
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
        
        width: width,
        color: Colors.other_black
      },
      // headerTintColor: 'green',
    };
  };

  constructor(props){
    super(props);
    this.state = {
      SessionId: this.props.navigation.getParam('SessionId', 'NO-IU'),
      typeTransfer: this.props.navigation.getParam('type_transfer', 'NO-TYPE-TRANSFER'),
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
      Alert.alert(
        'Error',
        `${error}`,
        [{ text: 'CANCELAR' }]
      );
    }
  }

  render() {
    return (
      <View style={[common.flex_1, common.bg_white]}>
        <View style={[common.pt_10, common.pb_10, common.mt_10]}>
          <Text style={[common.text_center,common.h1, common.text_other_black,]}>Verifique la información del auto</Text>
        </View>
        <View style={[common.bg_light, common.ml_10, common.mt_10, common.mr_10, common.pb_10]}>
          <Text style={[common.h2, common.text_black_dark, common.pl_10, common.pt_10, common.pb_10, common.bold]}>DATOS DEL AUTO</Text>

          <View style={{flexDirection: 'row'}}>
          
            <View style={[common.w_45, common.pl_10, common.pr_10, common.mr_10]}>
              <Text style={[common.h3, common.text_other_black]}>No. Económico:</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>Modelo:</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>Version:</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>Placas:</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>Color:</Text>
            </View>
            <View style={[common.w_45, common.pr_10]}>
              <Text style={[common.h3, common.text_other_black]}>{this.state.num_economic}</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>{this.state.model}</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>{this.state.version}</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>{this.state.plate}</Text>
              <Text style={[common.h3, common.pt_10, common.text_other_black]}>{this.state.color}</Text>
            </View>
          </View>
          
        </View>
        {/* Container information */}

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
              onPress={() => this.props.navigation.goBack() }
            />
          </View>

          <View style={[common.w_45_btn, common.mr_10]}>
            <Buttons
              borderColor={common.bg_yellow}
              bg={common.border_yellow}
              textLabel="SIGUIENTE"
              onPress={() => this.props.navigation.navigate('Change',{
                SessionId: this.state.SessionId,
                type_transfer: this.state.typeTransfer
              }
              ) }
            />
          </View>

        </View>
        {/* Botones */}

      </View>
      // Main
    );
  }
}

