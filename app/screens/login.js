import React, { Component } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import axios from 'axios';


import HeaderLogin from '../components/helpers/header-login';
import InputField  from '../components/form/input';
import Buttons from '../components/buttons/button';

import common from '../constants/common';
import API from '../constants/base_url';

export default class Login extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      emptyUsername: false,
      emptyPassword: false,
      isLoading: false
    };

    this.handleChange   = this.handleChange.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  // This method is load then finished, this componente
  _loadInitialState = async () => {
    try {
      // Get data of user, if existe any.
      const session = await AsyncStorage.getItem('user');
      // If existe change to creen
      if (session !== null) 
        this.props.navigation.navigate('Search');
    } catch (error) {
      alert("Ocurrio algo en el async")
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value.toUpperCase(),
      ["empty"+key]: false,
    });
  }

  handleValidate(){
    const { Username, Password } = this.state;
    
    ( Username === '' ) ? this.setState({ emptyUsername: true }) : this.setState({ emptyUsername: false }) ;
    ( Password === '' ) ? this.setState({ emptyPassword: true }) : this.setState({ emptyPassword: false }) ;

    // This call method handleSubmit
    if ( Username !== '' && Password !== '')
      this.handleSubmit();
  }

  handleSubmit = () => {
    this.setState({ isLoading: true, });
    // // Do request to api send params at form
    axios.post(API.url, {
      Username: this.state.Username,
      Password: this.state.Password,
      Action: "Login"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this._storeData(response.data.result);
        this.setState({ isLoading: false });
      } else {
        alert(response.data.result.ErrorDescription);
        this.setState({ isLoading: false });
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      this.setState({isLoading: false});
      alert(error);
    });
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(data));
      this.props.navigation.navigate('Search');
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={[common.flex_1, common.bg_white]} behavior="padding">
        <HeaderLogin />
        <View
          style={[common.pl_10, common.pr_10, common.center, { flex: 5 }]}
        >
          <InputField
            holderText="Usuario"
            isEmpty={this.state.emptyUsername}
            onChangeText={value => this.handleChange("Username", value)}
            value={this.state.Username}
          />
          <InputField
            inputTop={true}
            inputIcon={true}
            isTrue={true}
            typeIcon="eye_password"
            isEmpty={this.state.emptyPassword}
            holderText="Contraseña"
            onChangeText={value => this.handleChange("Password", value)}
          >
          </InputField>
          
          <View 
            style={[{
              borderWidth:4,
              width:50,
              borderRadius:50,
              marginTop: 20,
              marginBottom: 10},  
              common.border_black_dark ]}
          >
          </View>

          <Buttons
            textLabel="INGRESAR"
            bg={common.bg_yellow}
            borderColor={common.border_yellow}
            onPress={this.handleValidate}
            isLoading={this.state.isLoading}
          ></Buttons>

        </View>
      </KeyboardAvoidingView>
    );
  }
}