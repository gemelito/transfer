import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import API from '../constants/base_url';


export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      session: '',
      errorLabel: false
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
      // console.log(json_user["Session"]["SessionId"]);
     }
   } catch (error) {
     alert(error);
   }
 }

  handleValidate = () => {
    ( this.state.search === '' ) ? this.setState({ errorLabel: true }) : this.handleSubmit();
  }

  handleSubmit = () => {
    console.log(this.state);
    this.setState({ errorLabel: false })
    // Call to animation
    // this.handlerLoading();

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
      } else {
        alert(response.data.result.ErrorDescription);
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      this.setState({
        is_loading: false
      });
      alert(error);
    });
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('car', JSON.stringify(data));
      this.props.navigation.push('Search');
    } catch (error) {
      console.log(error);
    }
  }



  render() {
    return (
      <KeyboardAvoidingView style={styles.main_login}  behavior="padding" >
          


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

  
  
  // Esto debe ser global

  input_icon: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
  },
  inputStyle: {
    flex: 1,
  },
  icon: {
    paddingTop: 10,
    paddingRight: 10,
  },

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
  
});
