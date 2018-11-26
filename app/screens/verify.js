import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Picker,
  AsyncStorage,
  ActivityIndicator,
  Image,
  ImageBackground,
  TouchableOpacity,
  // Dimensions,
  Alert
} from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Buttons from '../components/buttons/button';
import InputField from '../components/form/input';

import Colors from '../constants/colors';
import common from '../constants/common';
import API from '../constants/base_url';

const CAR = require('../../assets/car.png');

const EMPTY = require('../../assets/square-empty.png');
const FILLED = require('../../assets/square-filled.png');

export default class Verify extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      SessionId: this.props.navigation.getParam('SessionId', 'NO-IU'),
      typeTransfer: this.props.navigation.getParam('type_transfer', 'NO-TYPE-TRANSFER'),
      photo: this.props.navigation.getParam('photo', null),
      picture: this.props.navigation.getParam('picture', null),
      num_economic: '',
      model: '',
      fuel: '',
      quanty: [1,2,3,4,5,6,7,8],
      kms: '',

      editkms: false,
      emptykms: false,
      isfocuskms: false,
      editfuel: false,
      isCamera: false,
      isLoading: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
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
          num_economic: car_json.Car.EconomicNumber,
          model: car_json.Car.Name,
          fuel: car_json.Car.Fuel,
          kms: car_json.Car.Kms.toString(),
        });
        setTimeout(() => {
          this.setState({ isLoading: true });
        }, 1000)
      }
    } catch (error) {
      Alert.alert(
        'Advertencia',
        `${error}`,
        [{ text: 'CANCELAR' }]
      );
    }
  }

  handleEdit = (key) => {
    if( key === "kms" ){
      this.setState({ 
        editkms: !this.state.editkms,
        isfocuskms: !this.state.isfocuskms
      });
    }

    if ( key === "fuel" ){
      this.setState({ editfuel: !this.state.editfuel });
    }
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
      ["empty" + key]: false,
    });
  }

  handleSubmit = () => {
    const { kms, fuel, SessionId, picture, typeTransfer } = this.state;
    if( kms === ''){
      this.setState({ emptykms: true, editkms: true });
      return false;
    }
    if (picture === null) {
      Alert.alert(
        'Advertencia',
        'Se debe tomar la foto',
        [{ text: 'CANCELAR' }]
      );
      return false;
    }
    if (isNaN(kms)) {
      Alert.alert(
        'Advertencia',
        'El kilometraje debe ser númerico',
        [{ text: 'CANCELAR' }]
      );
      return false;
    }
    this.setState({ isLoading: false, });
    axios.post(API.url, {
      Kms: kms,
      Fuel: fuel,
      Picture: picture,
      SessionId: SessionId,
      Id: 0,
      Action: "SetTransfer"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this.setState({ isLoading: true });
          this.props.navigation.navigate('Finalize', {
            SessionId: SessionId,
            type_transfer: typeTransfer,
          });
      } else {
        this.setState({ isLoading: true });
        Alert.alert(
          'Advertencia',
          `${response.data.result.ErrorDescription}`,
          [{ text: 'CANCELAR' }]
        );
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      this.setState({ isLoading: true });
      Alert.alert(
        'Error',
        `${error}`,
        [{ text: 'CANCELAR' }]
      );
    });
  }

  render() {
    const { num_economic, model, fuel, kms, quanty, isLoading, editkms, emptykms, isfocuskms, editfuel } = this.state;

    const rendeFuel = quanty.map((quanty, index) => {
      if (quanty <= fuel) {
        return(<Image source={FILLED} style={[common.mr_5]} key={index}/>);
      }
      return (<Image source={EMPTY} style={[common.mr_5]} key={index}/>);
    });

    if (isLoading) {
      return (
        <KeyboardAvoidingView style={[common.flex_1, common.bg_white]} behavior="padding" enabled>

          <View style={[ common.pb_10, common.mt_10]}>
            <Text style={[common.h1, common.text_other_black, common.text_center,]}>Verificar Kilometraje y Gasolina</Text>
          </View>

          {/* Container information */}
          <View>
            {/* Carro */}
            <View style={[common.bg_light, common.display_flex, common.row, common.ml_10, common.mr_10, common.mb_10,]}>
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
            <View style={[common.display_flex, common.row, common.space_between, common.w_100, common.pb_20]}>

              <View style={[common.bg_light, common.ml_10, common.pad_l_10, common.pt_10, common.pb_10, common.w_45]}>

                <View style={common.row}>
                  <View style={[common.w_35]}>
                    <Text style={[common.h2, common.text_other_black, common.bold]}>KM</Text>
                  </View>
                  <View style={[]}>
                    <TouchableOpacity onPress={() => this.handleEdit("kms")}>
                      <MaterialIcons name="mode-edit" size={30} style={[common.text_other_black]} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[common.mr_10]}>
                  {editkms ?
                    <InputField
                      inputHeight={20}
                      isEmpty={emptykms}
                      autoFocus={isfocuskms}
                      maxLength={30}
                      onChangeText={value => this.handleChange("kms", value)}
                      value={kms}
                      keyboardType={'numeric'}
                    />
                    :
                    <Text style={[common.h2, common.text_black_dark, common.bold]}>{kms}</Text>
                  }
                </View>
              </View>

              <View style={[common.bg_light, common.mr_10, common.pad_l_10, common.pt_10, common.pb_10, common.w_45]}>

                <View style={common.row}>
                  <View style={[common.w_35]}>
                    <Text style={[common.h2, common.text_other_black, common.bold]}>GAS</Text>
                  </View>
                  <View style={[ ]}>
                    <TouchableOpacity onPress={() => this.handleEdit("fuel")}>
                      <MaterialIcons name="mode-edit" size={30} style={[common.text_other_black]} />
                    </TouchableOpacity>
                  </View>
                </View>
                {editfuel ?
                  <View style={[common.border, common.border_black_dark, common.mr_10]}>
                    <Picker
                      style={{height:42}}
                      selectedValue={fuel}
                      onValueChange={value => this.handleChange("fuel", value)}>
                      <Picker.Item label="1/8" value={1} color={Colors.other_black} key={1} />
                      <Picker.Item label="2/8" value={2} color={Colors.other_black} key={2} />
                      <Picker.Item label="3/8" value={3} color={Colors.other_black} key={3} />
                      <Picker.Item label="4/8" value={4} color={Colors.other_black} key={4} />
                      <Picker.Item label="5/8" value={5} color={Colors.other_black} key={5} />
                      <Picker.Item label="6/8" value={6} color={Colors.other_black} key={6} />
                      <Picker.Item label="7/8" value={7} color={Colors.other_black} key={7} />
                      <Picker.Item label="8/8" value={8} color={Colors.other_black} key={8} />
                    </Picker>
                  </View>
                  :
                  <View style={[common.row, common.mt_10, { height: 30 }]}>
                    {rendeFuel}
                  </View>
                }
              </View>

            </View>
            {/* informacion del carro */}

            { this.state.photo !== null ?
              /* imagen */
              <View style={[common.bg_light, common.ml_10, common.mr_10, ]}>
                <ImageBackground
                  style={[common.h_image]}
                  source={{ uri: this.state.photo }}
                >

                  <TouchableOpacity
                    style={[
                      common.center,
                      common.absolute,
                      {
                        bottom: hp('5%'),
                        left: wp('36%'),
                        borderRadius: 50,
                        padding: 2.3,
                        borderWidth: 3.5, borderColor: "white",
                      }]}

                    activeOpacity={0.7}
                    onPress={() => this.props.navigation.push('Camera', {
                      SessionId: this.state.SessionId,
                      type_transfer: this.state.typeTransfer
                    })}
                  >
                    <MaterialIcons name="camera-alt" size={hp('8%')}
                      style={[
                        common.text_white,
                        {
                          borderRadius: 50,
                          paddingLeft: 12,
                          backgroundColor: 'background: rgba(0,0,0,0.5);',
                          paddingRight: 12,
                          padding: 10
                        }]}
                    />
                  </TouchableOpacity>
                </ImageBackground>

              </View>
              /* imagen */
              :
              /* camera */
              <View style={[common.bg_light, common.mr_10, common.pl_10, common.pt_10, common.pb_10, common.ml_10, common.mr_10, common.h_image]}>
                <TouchableOpacity
                  style={[
                    common.center, 
                    common.absolute,
                    { bottom: hp('5%'), 
                      left: wp('36%'), 
                      borderRadius: 50,
                      padding: 2.3,
                      borderWidth: 3.5, borderColor: "white",
                    }]}
                
                  activeOpacity={0.7}
                  onPress={() => this.props.navigation.push('Camera', {
                    SessionId: this.state.SessionId,
                    type_transfer: this.state.typeTransfer
                  })}
                >
                  <MaterialIcons name="camera-alt" size={hp('8%')} 
                    style={[
                      common.text_white,
                      {
                        borderRadius: 50,
                        paddingLeft: 12,
                        backgroundColor: 'background: rgba(0,0,0,0.5);',
                        paddingRight: 12,
                        padding:10
                    }]}
                  />
                </TouchableOpacity>
              </View>
              /* camera */
            }

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
                onPress={this.handleSubmit}
              />
            </View>
          </View>
          {/* Botones */}


        </KeyboardAvoidingView>
      );
    }else{
      return (
        <View style={[common.flex_2, common.bg_white, common.center]}>
          <ActivityIndicator size={70} color="#037B00" />
        </View>
      );
    }
  }
}