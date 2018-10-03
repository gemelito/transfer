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

export default class Login extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      Username: '',
      Password: '',
      Action: 'Login',
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
        this.props.navigation.navigate('Main');
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
    this.props.navigation.push('Search');

    // // Do request to api send params at form
    // axios.post(API.api, {
    //   "Username": this.state.Username,
    //   "Password": this.state.Password,
    //   "Action"  : this.state.login
    // })
    // .then( (response) => {
    //   // Get response, if response (Success) was true change to screen
    //   if (response.data.result.Success  && response.data.result.Success === true) {
    //     this.props.navigation.push('Search');
    //   }else{
    //     alert(response.data.result.ErrorDescription);
    //   }
    // })
    // .catch( (error) => {
    //   // If exist error finished animation and show error
    //   this.setState({
    //     is_loading: false
    //   });
    //   alert(error);
    // });

  }

	handlerLoading = () => {
	  this.setState({
	    is_loading: true
	  });

	  this.colorValue.setValue(0);
	  Animated.timing(this.colorValue, {
	    toValue: 100,
	    duration: 10000
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

          <TextInput
            secureTextEntry={true}
            style={[styles.input, this.state.errorPassword ? styles.invalid : styles.valid ]}
            placeholder="Contraseña"
            underlineColorAndroid="transparent"
            onChangeText={ (Password)  =>  this.setState({Password}) }
          />

          {/* <TouchableOpacity
            style={styles.btn}
            onPress = {
              (this.handleSubmit.bind(this))
            }
          >
            <Text style={styles.text_login}>Iniciar sesión</Text>
          </TouchableOpacity> */}

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
      width: 300,
      height: 50,
      borderRadius: 5,
      paddingLeft: 5,
      color: Colors.black,
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
  }

});
