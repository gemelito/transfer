import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  AsyncStorage,
  Animated,
  Image,
  ToastAndroid
} from 'react-native';
import HeaderLogin from './header-login';
import Colors from '../constants/colors';
import axios from 'axios';
import API from '../constants/base_url';

import { Ionicons } from '@expo/vector-icons';

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
      is_loading: false
    }

    this.colorValue = new Animated.Value(0);
    
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
        // if (typeof session === 'string'){
        //   alert("Es un texto");
        // }else{
        //   alert("No es un texto");
        // }
        // console.log(session);
        this.props.navigation.navigate('Search');
      }
    } catch (error){
      alert("Ocurrio algo en el async")
    }
  }

  // This validate the inputs not is empty
  handleValidate = () => {

    if ( this.state.Username === '' ){
      this.setState({ errorUsername: true });
    }else{
      this.setState({ errorUsername: false });
    }
    if ( this.state.Password === '' ){
      this.setState({ errorPassword: true });
    }else{
      this.setState({ errorPassword: false });
    }

    // This call method handleSubmit
    if ( this.state.Username !== '' && this.state.Password !== '')
      this.handleSubmit();

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
      this.props.navigation.push('Search');
    } catch (error) {
      console.log(error);
    }
  }

	handlerLoading = () => {
	  this.setState({
	    is_loading: true
	  });

	  this.colorValue.setValue(0);
	  Animated.timing(this.colorValue, {
	    toValue: 100,
	    duration: 15000
	  }).start(() => {
	    this.setState({
	      is_loading: false
	    });
	  });
  }
  

  render() {
    const colorAnimation = this.colorValue.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [Colors.black, Colors.black_dark, Colors.other_black]
    });
    return (
      <KeyboardAvoidingView style={styles.main_login}  behavior="padding" >
        <HeaderLogin/>
        <View style={styles.container}>
          <TextInput
            style={[styles.input, this.state.errorUsername ? styles.invalid : styles.valid ]}
            placeholder="Username"
            underlineColorAndroid="transparent"
            onChangeText={ (Username)  =>  this.setState({Username}) }
          />

          {/* <TextInput
            secureTextEntry={true}
            style={[styles.input, this.state.errorPassword ? styles.invalid : styles.valid ]}
            placeholder="Contraseña"
            underlineColorAndroid="transparent"
            onChangeText={ (Password)  =>  this.setState({Password}) }
          />
          <Ionicons name="md-eye-off" size={32} color="green" styles={styles.my_icon} /> */}

          <View style={[styles.input_icon, this.state.errorPassword ? styles.invalid : styles.valid]}>
            <TextInput
              style={[styles.inputStyle]}
                autoCorrect={false}
                secureTextEntry
                placeholder="Contraseña"
                underlineColorAndroid="transparent"
                onChangeText={ (Password)  =>  this.setState({Password}) }
              />
            <Ionicons name="md-eye-off" size={32} style={styles.icon}/>
          </View>

          <TouchableWithoutFeedback onPress={this.handleValidate.bind(this)}>
            <Animated.View 
              style={[
                styles.btn,
                this.props.styles ? this.props.styles.button : '',
              {
                backgroundColor: colorAnimation
              },
              ]}
            >
              { 
                this.state.is_loading && 
                <Image
                  style={styles.loader}
                  source={require('../../assets/load.gif')}
                />
              }
              <Text style={styles.text_login}>
                { this.state.is_loading ? 'loading...' : 'Iniciar sesion'}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  main_login: {
    flex:1
  },
  
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: Platform.select({
    ios: {},
    android:{
    flexDirection: 'row',
      width: 300,
      height: 50,
      borderRadius: 5,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 10,
      borderWidth: 1
    }
  }),

  valid: Platform.select({
    ios: {},
    android: {
      borderColor: Colors.black_dark
    }
  }),

  invalid: Platform.select({
    ios: {},
    android: {
      borderColor: Colors.red,
    }
  }),

  btn: {
    borderRadius: 5,
    backgroundColor: Colors.black,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
		alignItems: 'center',

  },

  text_login: {
    color: Colors.white,
    fontSize: 18
  },

  loader: {
    width: 23,
    height: 23,
    marginRight: 10
  },


  input_icon: {
    flexDirection: 'row',
    width:300,
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  inputStyle: {
    flex: 1,
  },
  icon: {
    paddingTop: 10
  }
  
});
