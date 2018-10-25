// @flow
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  Alert,
  type, ListViewDataSource,
} from 'react-native';
import Expo, { Components, Permissions, BarCodeScanner } from 'expo'; // eslint-disable-line no-unused-vars
import axios from 'axios';

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
    };
  }

  componentWillMount() {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
    })();
    console.log(this.state.SessionId);
  }

  handleScanner = (ScannerData) => {
    if(ScannerData.data > 0){
      this.setState({ search: ScannerData.data });
      this.doRequest();
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
        alert(response.data.result.ErrorDescription);
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      alert(error);
    });
  }

  _storeData = async (data) => {
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
      console.log(error);
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