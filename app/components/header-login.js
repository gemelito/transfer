import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image
 } from 'react-native';
import colors from '../constants/colors';


export default class HeaderLogin extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/logo_2.png')}
        ></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    paddingBottom: 30,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});