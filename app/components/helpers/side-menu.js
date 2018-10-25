import React from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

export default class SideMenu extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      Username: '',
      Office: ''
    }

    this._loadingInfoUserAsync();
  }

  _loadingInfoUserAsync = async () =>{
    try {
      const session = await AsyncStorage.getItem('user');
      if (session !== null) {
        let user = JSON.parse(session);
        this.setState({
          Username: user.Session.User.UserName,
          Office: user.Session.User.OfficeName
        })
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error,
        [{ text: 'CANCELAR' }]
      );
    }
  }

  _signOutAsync = async () => {
    try {
      await AsyncStorage.clear();
      const session = await AsyncStorage.getItem('user');
      if (session === null) {
        this.props.navigation.navigate('Auth');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error,
        [{ text: 'CANCELAR' }]
      );
    }
  }

  render() {
    const { Username, Office} = this.state;
    
    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
      	<TouchableOpacity onPress={() => navigateToCallback('Search')} style={styles.header_drawer}>
          <View style={{width: 70}}>
            <Image
              source={require('../../../assets/avatar.png')}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.header_drawer_h1}>{Username}</Text>
            <Text style={styles.header_drawer_p}>{Office}</Text>
          </View>        
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn_liks}
          onPress = {
            () => {
              this.props.navigation.navigate('Search');
              this.props.navigation.closeDrawer();

            }
          }
        >
          <View style={styles.space_text_icon}>
            <Ionicons name="md-search" size={25} color={Colors.white}/>
            <Text style={styles.text_with_icon}>CONSULTAR</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btn_liks}
          onPress = {this._signOutAsync}
        >
          <View style={styles.space_text_icon}>
            <Ionicons name="md-log-out" size={25} color={Colors.white}/>
            <Text style={styles.text_with_icon}>CERRAR SESIÓN</Text>
          </View>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  header_drawer: {
    flexDirection: 'row',
    backgroundColor: Colors.black_light,
    paddingVertical: 28,
    paddingLeft: 17,
    paddingTop: 50,
    marginBottom: 10
  },

  header_drawer_h1: {
    width: 150,
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },

  header_drawer_p: {
    color: Colors.other_black,
    fontSize: 13
  },

  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 5
  },

  btn_liks: {
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

  space_text_icon: {
    flexDirection: 'row',
  },

  text_with_icon: {
    color: Colors.white, 
    fontSize: 16,
    marginTop: 1,
    paddingLeft: 10,
    fontWeight: 'bold',
  }


});
