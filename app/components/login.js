import React from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity,
  Text,
} from 'react-native';
import axios from 'axios';

import HeaderLogin from './header-login';
import Buttons from './buttons/button';

import API from '../constants/base_url';
import InputField from './form/input';

import common from '../constants/common';


export default class Login extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      Username: '',
      Password: '',
      errorUsername: false,
      errorPassword: false,
      is_loading: false,
    }

    this.handleValidate = this.handleValidate.bind(this);
  }

  componentDidMount(){
    this._loadInitialState().done();
  }
  
  // This method is load then finished, this componente
  _loadInitialState = async () => {
    try{
      // Get data of user, if existe any.
      const session = await AsyncStorage.getItem('user');
      // If existe change to creen
      if ( session !== null ){
        this.props.navigation.navigate('Search');
      }
    } catch (error){
      alert("Ocurrio algo en el async")
    }
  }

  // This validate the inputs not is empty
  handleValidate() {
    const { Username, Password } = this.state;
    console.log(this.state);
    // ( Username === '' ) ? this.setState({ errorUsername: true }) : this.setState({ errorUsername: false }) ;
    
    // ( Password === '' ) ? this.setState({ errorPassword: true }) : this.setState({ errorPassword: false }) ;
    

    // // This call method handleSubmit
    // if ( Username !== '' && Password !== '')
    //   this.handleSubmit();

  }

  handleSubmit = () => {

    // Call to animation
    this.handlerLoading();
    // this.props.navigation.push('Search');

    // // Do request to api send params at form
    axios.post(API.url, {
      Username: this.state.Username,
      Password: this.state.Password,
      Action  : "Login"
    })
    .then( (response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success  && response.data.result.Success === true) {
        // AsyncStorage.setItem('user', JSON.stringify(response.data.result));
        // this.props.navigation.push('Search');
        this._storeData(response.data.result);
      }else{
        alert(response.data.result.ErrorDescription);
      }
    })
    .catch( (error) => {
      // If exist error finished animation and show error
      this.setState({
        is_loading: false
      });
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
  
  handleChangeText = (text) => {
    console.log(text);
  }
  render() {
    return (
      <KeyboardAvoidingView style={[common.flex_1, common.bg_white]}  behavior="padding">
        <HeaderLogin/>
          
        <View style={[common.ml_10, common.mr_10, common.center, {flex:5}]}>
          <InputField
            placeholder="Usuario"
            inValid={this.state.errorUsername}
            onChangeText={this.handleChangeText.bind(this)}
            value={this.state.Username}
          />
          <InputField
            have_top={true}
            input_icon={true}
            placeholder="Contraseña"
            password={true}
            inValid={this.state.errorPassword}
            onChangeText={ (Password)  =>  this.setState({Password}) }
          />

          <View style={[ {borderWidth: 4,width:35,  borderRadius:5, marginTop:20, marginBottom: 10}, common.border_other_black,]} />

          <TouchableOpacity
            style={[
              common.border,
              common.w_100,
              common.bg_yellow,
              common.border_yellow,
              common.pt_10,
              common.pb_10,
              common.text_center,
              common.mt_10
            ]}
            activeOpacity={0.7}
            onPress={this.handleValidate}
          >
              <Text style={[common.text_black, common.fs_16, common.bold]}>
                {/* { this.state.is_loading ? 'loading...' : 'Iniciar sesion'} */}
                INGRESAR
              </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    );
  }

}

