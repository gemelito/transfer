import React from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';

export default class SideMenu extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'green'}}>
      	<TouchableOpacity onPress={() => navigateToCallback('Search')} style={styles.header_drawer}>
          <View style={{width: 70}}>
            <Image
              source={require('../../assets/avatar.png')}
              style={styles.avatar}
            />
          </View>
          <View>
            <Text style={styles.header_drawer_h1}>PEÑA KINIL ARIEL ARMANDO</Text>
            <Text style={styles.header_drawer_p}>Cancún - Aeropuerto</Text>
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
          onPress = {
            () => {
              this.props.navigation.navigate('Login');
              this.props.navigation.closeDrawer();
            }
          }
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
