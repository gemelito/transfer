import React from 'react';
import { 
  StyleSheet, 
  View,
  Image,
  ScrollView,
  Dimensions
 } from 'react-native';
import colors from '../../constants/colors';

const ex = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}


export default class HeaderLogin extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}
        keyboardDismissMode='interactive'
      >
        <View style={styles.container}>
          { ex.width >= 768 && ex.height >= 1024 ?
            <Image
              source={require('../../../assets/logo_4.png')}
            />
            :
            <Image
              source={require('../../../assets/logo_2.png')}
            />
          }
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