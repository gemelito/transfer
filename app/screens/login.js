import React, { Component } from 'react';
import { View, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

  componentDidMount() {}

  handleChange(key, value) {
    this.setState({
      [key]: value,
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
      Username: this.state.Username.toUpperCase(),
      Password: this.state.Password,
      Action: "Login"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this._storeData(response.data.result);
        
      } else {
        Alert.alert(
          'Error',
          `${response.data.result.ErrorDescription}`,
          [{ text: 'CANCELAR' }]
        );
        this.setState({ isLoading: false });
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      Alert.alert(
        'Error',
        `${error}`,
        [{ text: 'CANCELAR' }]
      );
      this.setState({isLoading: false});
    });
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(data));
      this.setState({ isLoading: false });
      this.props.navigation.navigate('Search',
      {
        SessionId: data.Session.SessionId,
      });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const { isLoading } = this.state;
    if (!isLoading) {
      return (
        <KeyboardAvoidingView style={[common.flex_1, common.bg_white]} behavior="padding">
          <HeaderLogin />
          <View
            style={[common.w_100, common.pl_10, common.pr_10, common.center, { flex: 5 }]}
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
                width: wp('10%'),
                borderRadius:50,
                marginTop: hp('3%'),
                marginBottom: hp('3%')},  
                common.border_black_dark ]}
            >
            </View>
            
            <View style={[common.w_100, common.pl_10, common.pr_10]}>
              <Buttons
                textLabel="INGRESAR"
                bg={common.bg_yellow}
                borderColor={common.border_yellow}
                onPress={this.handleValidate}
                isLoading={this.state.isLoading}
              />
            </View>

          </View>
        </KeyboardAvoidingView>
      );
    }else{return (
        <View style={[common.flex_2,common.center, common.bg_white]}>
          <ActivityIndicator size={70} color="#037B00" />
        </View>
      );
    }

  }
}