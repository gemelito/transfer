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
import API from '../constants/base_url';


export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      session: '',
      errorLabel: false,
      is_loading: false,
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
      // console.log(json_user["Session"]["SessionId"]);
     }
   } catch (error) {
     alert(error);
   }
 }

 handleChangeText = (text) => {
  this.setState({
    search: text.toLocaleUpperCase(),
    errorLabel: false,
    isFocused: true
  });
 }

  onFocusChange = () => {
    this.setState({
      isFocused: true
    });
  }

  handleValidate = () => {
    ( this.state.search === '' ) ? this.setState({ errorLabel: true }) : this.handleSubmit();
  }

  handleSubmit = () => {
    this.setState({ 
      errorLabel: false,
      is_loading: true,
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
          is_loading: false
        });
      } else {
        alert(response.data.result.ErrorDescription);
        this.setState({
          is_loading: false,
          search: '',
          isFocused: true
        });
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
              styles.row, styles.border, styles.ml_10, styles.mr_10, styles.pl_10,
              this.state.errorLabel ? styles.border_invalid : (this.state.isFocused) ? styles.border_valid : styles.border_black_dark
            ]}
          >
            <TextInput
              style={[
                styles.flex_1, styles.pt_10, styles.pb_10, {fontSize:18}
              ]}
              onFocus={this.onFocusChange}
              placeholder="Ingresa número económico"
              underlineColorAndroid="transparent"
              onChangeText={ this.handleChangeText }
              value={this.state.search}
            />
            <Ionicons name="md-search" size={32} onPress={this.handleValidate.bind(this)} 
              style={[
                styles.pt_10, styles.pr_10,
                this.state.errorLabel ? styles.text_red : (this.state.isFocused) ? styles.text_green : styles.text_black_dark
              ]}
            />
          </View>
          { this.state.is_loading &&
            <ActivityIndicator size="large" color={Colors.green} />
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

  border: {
    borderWidth: 1,
    borderRadius: 5,
  },

  flex_1: {
    flex: 1,
  },

  row: {
    flexDirection: 'row'
  },

  pl_10: {
    paddingLeft: 10
  },
  pt_10: {
    paddingTop: 10,
  },
  pr_10: {
  paddingRight: 10
  },
  pb_10: {
    paddingBottom: 10,
  },

  ml_10: {
    marginLeft: 10
  },
  mt_10: {
    marginBottom: 10
  },
  mr_10: {
    marginRight: 10
  },

  /** Style valid input **/
  border_black_dark: {
    borderColor: Colors.black_dark
  },
  border_valid: {
    borderColor: Colors.green
  },
  border_invalid: {
    borderColor: Colors.red,
  },
  text_green: {
    color: Colors.green
  },
  text_red: {
    color: Colors.red
  },
  text_black:{
    color: Colors.black_dark
  },
  text_black_dark: {
    color: Colors.black_dark
  }
  

  
});
