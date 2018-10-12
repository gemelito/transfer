import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import common from '../constants/common';
import API from '../constants/base_url';


export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      session: '',
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
      let json_user = JSON.parse(session);
      this.state.session = json_user["Session"]["SessionId"];
     }
   } catch (error) {
     alert(error);
   }
 }

 handleChangeText = (text) => {
  this.setState({
    search: text.toUpperCase(),
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
      SessionId: this.state.session,
      Id: this.state.search,
      Action: "GetCar"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this._storeData(response.data.result);
        this.setState({
          isLoading: false
        });
      } else {
        alert(response.data.result.ErrorDescription);
        this.setState({
          isLoading: false,
          search: '',
          isFocused: true
        });
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      this.setState({
        isLoading: false
      });
      alert(error);
    });
  }

  _storeData = async (data) => {
    let type_transfer = 'CAMBIO';
    try {
      await AsyncStorage.setItem('car', JSON.stringify(data));
      if (data.Car.Transfer.ActionType === 'S'){
        type_transfer = 'TRASLADO';
      }
      this.props.navigation.navigate('Car', {
        type_transfer: type_transfer,
      });
    } catch (error) {
      alert(error);
    }
  }


  render() {
    return (
      <KeyboardAvoidingView style={styles.main_login}  behavior="padding" enabled>
          
        <View 
          style={[
            common.row, 
            common.border, 
            common.ml_10, 
            common.mr_10, 
            common.pl_10,

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
              common.pt_10, common.pr_10,
              this.state.errorLabel ? common.text_red : (this.state.isFocused) ? common.text_green : common.text_black_dark
            ]}
          />

      </View>

        { this.state.isLoading &&
          <ActivityIndicator size="large" color={Colors.black} />
        }

      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main_login: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
