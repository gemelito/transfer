import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import Buttons from '../components/buttons/button';

import common from '../constants/common';
import API from '../constants/base_url';


export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      SessionId: '',
      errorLabel: false,
      isLoading: false,
      isFocused: false
    }
  }

  componentDidMount(){
    this._loadInitialState().done();
  }

 // This method is load then finished, this componente
 _loadInitialState = async () => {
   try {
      // Get data of user, if existe any.
      const session = await AsyncStorage.getItem('user');
      // If existe change to creen
      if (session !== null) {
        let user = JSON.parse(session);
        this.state.SessionId = user.Session.SessionId;
      }
   } catch (error) {
     Alert.alert(
       'Error',
       `${error}`,
       [{ text: 'CANCELAR' }]
     );
   }
 }

 handleChangeText = (text) => {
  this.setState({
    search: text,
    errorLabel: false,
    isFocused: true
  });
 }

  onFocusChange = () => { this.setState({ isFocused: true }); }

  handleValidate = () => {
    ( this.state.search === '' ) ? this.setState({ errorLabel: true }) : this.handleSubmit();
  }

  handleSubmit = () => {
    this.setState({ 
      errorLabel: false,
      isLoading: true,
      isFocused: false
    });

    // Do request to api send params at form
    axios.post(API.url, {
      SessionId: this.state.SessionId,
      Id: this.state.search.toUpperCase(),
      Action: "GetCar"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this._storeData(response.data.result);
      } else {
        Alert.alert(
          // This is Alert Dialog Title
          'Advertencia',
          // This is Alert Dialog Message. 
          `${response.data.result.ErrorDescription}`,
          [ 
            // Third OK Button in Alert Dialog
            { text: 'CANCELAR' },
          ]
        );
        this.setState({
          isLoading: false,
          search: '',
          isFocused: true
        });
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      Alert.alert(
        'Error',
        `${error}`,
        [ { text: 'CANCELAR' }]
      );
      this.setState({ isLoading: false});
    });
  }

  _storeData = async (data) => {
    let type_transfer = 'RECIBIR';
    try {
      await AsyncStorage.setItem('car', JSON.stringify(data));
      this.setState({ isLoading: false });
      if (data.Car.Transfer.ActionType === 'S'){
        type_transfer = 'TRASLADO';
      }
      this.props.navigation.navigate('Car', {
        type_transfer: type_transfer,
        SessionId: this.state.SessionId,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        `${error}`,
        [{ text: 'CANCELAR' }]
      );
    }
  }


  render() {
    const { isLoading} = this.state;
    if (!isLoading) {
      return (
        <KeyboardAvoidingView style={[common.bg_white, common.center, common.flex_1] }  behavior="padding" enabled>
          <View style={[common.w_100, common.pl_10, common.pr_10]}>

            <Buttons
              textLabel="ESCANEAR CÓDIGO"
              bg={common.bg_yellow}
              borderColor={common.border_yellow}
              onPress={() =>{
                this.props.navigation.navigate('Scanner', {
                  SessionId: this.state.SessionId,
                });
              }}
            />

            <View 
              style={[
                common.row, 
                common.border, 
                common.mt_10, 
                common.pad_l_10,
                

                this.state.errorLabel ? common.border_invalid : (this.state.isFocused) ? common.border_valid : common.border_black_dark
              ]}
            >
              
              <TextInput
                style={[
                  common.flex_1, 
                  common.pt_10, 
                  common.pb_10, 
                  common.fs_16
                ]}

                onFocus={this.onFocusChange}
                placeholder="Ingresa número económico"
                underlineColorAndroid="transparent"
                onChangeText={ this.handleChangeText }
                value={this.state.search}
              />

              <Ionicons name="md-search" size={32} onPress={this.handleValidate.bind(this)} 
                style={[
                  common.pt_10, common.pad_r_10,
                  this.state.errorLabel ? common.text_red : (this.state.isFocused) ? common.text_green : common.text_black_dark
                ]}
              />

          </View>
          </View>

        </KeyboardAvoidingView>
      );
    } else {
      return (
        <View style={[common.flex_2, common.center, common.bg_white]}>
          <ActivityIndicator size={70} color="#037B00" />
        </View>
      );
    }
  }
}
