// @flow
import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from "react-native";
import Expo, { Permissions, BarCodeScanner } from 'expo'; // eslint-disable-line no-unused-vars
import axios from 'axios';

import ResetNavigation from '../components/resetNavigation';

import API from '../constants/base_url';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 10,
  },
  listItem: {
    padding: 10,
    fontSize: 16,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default class App extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      hasCameraPermission: null,
      scannerOn: false,
      SessionId: this.props.navigation.getParam('SessionId', 'NO-IU'),
      count: 0
    };
  }

  componentWillMount() {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    })();
    // console.log(this.state.SessionId);
  }

  handleScanner = (ScannerData) => {
    if(this.state.count === 0 && ScannerData.data > 0){
      this.setState({ count: 1});
      console.log(ScannerData.data);
      this.setState({ search: ScannerData.data });
      setTimeout( () => {
        this.doRequest();
      }, 250);
    }
  };

  doRequest = () => {
    // Do request to api send params at form
    axios.post(API.url, {
      SessionId: this.state.SessionId,
      Id: this.state.search.toUpperCase(),
      Action: "GetCar"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this._storeData(response.data.result);
      } else {
        Alert.alert(
          'Error',
          `${response.data.result.ErrorDescription}`,
          [
            { text: 'Intentar una vez más', onPress: () => setTimeout(() => { this.setState({ count: 0 }) }, 250) },
            { text: 'Cancelar', onPress: () => this.props.navigation.dispatch(ResetNavigation) },
          ],
          { cancelable: false }
        );
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      Alert.alert(
        'Error',
        `${error}`,
        [
          { text: 'Cancelar', onPress: () => this.props.navigation.dispatch(ResetNavigation)  }
        ]
      )
    });
  }

  _storeData = async (data) => {
    this.setState({ count: 0 });
    let type_transfer = 'RECIBIR';
    try {
      await AsyncStorage.setItem('car', JSON.stringify(data));
      if (data.Car.Transfer.ActionType === 'S'){
        type_transfer = 'TRASLADO';
      }
      this.props.navigation.navigate('Car', {
        type_transfer: type_transfer,
        SessionId: this.state.SessionId,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        `${error}`,
        [
          { text: 'Intentar una vez más', onPress: () => setTimeout(() => { this.setState({ count: 0 }) }, 250) },
          { text: 'Cancelar', onPress: () => this.props.navigation.dispatch(ResetNavigation) }
        ]
      )
    }
  }

  render() {
    let contents;
    if (this.state.hasCameraPermission) {
      contents = (
        <BarCodeScanner
          onBarCodeRead={this.handleScanner}
          style={StyleSheet.absoluteFill}
          barCodeTypes={['ean13']}
        />
      );
    } else {
      contents = (
        <View style={{ marginTop: 50 }}>
          <Text>NO access camera</Text>
        </View>
      );
    }

    return (
      
      <View style={styles.container}>
        {contents}
      </View>
    );
  }
}