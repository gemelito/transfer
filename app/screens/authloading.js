import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  StyleSheet
} from 'react-native';

export default class AuthLoading extends React.Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    try {
      // Get data of user, if existe any.
      const session = await AsyncStorage.getItem('user');
      this.props.navigation.navigate(session ? 'App' : 'Auth');
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    } catch (error) {
      alert(error);
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={70} color="#037B00" />
        {/* <StatusBar barStyle="default" /> */}
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
