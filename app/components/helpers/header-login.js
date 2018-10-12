import React from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  ScrollView
 } from 'react-native';
import colors from '../../constants/colors';


export default class HeaderLogin extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}
        keyboardDismissMode='interactive'
      >
        <View style={styles.container}>
          <Image
            source={require('../../../assets/logo_2.png')}
          ></Image>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
    paddingBottom: 15
  },

});