import React from 'react';
import {
  StyleSheet,
  View,
  Picker,
  Text,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';

import Buttons from '../components/buttons/button';

import Colors from '../constants/colors';
import common from '../constants/common';
import API from '../constants/base_url';


export default class Change extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('type_transfer', 'A Nested Details Screen'),
      headerBackTitle: null,
      headerStyle: {
        // backgroundColor: '#0D2143',
        // position: 'absolute',
        // height: 50,
        // top: 0,
        // left: 0,
        // right: 0,
      },
      headerTitleStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        width: '70%',
        color: Colors.other_black
      },
      // headerTintColor: 'green',
    };
  };

  constructor(props){
    super(props);

    this.state = {
      Cities: [],
      SessionId: this.props.navigation.getParam('SessionId'),
      typeTransfer: this.props.navigation.getParam('type_transfer'),

      PlaceOrigin: '',
      isEnabledPlaceOrigin: true,
      OfficePlaceOrigin: '',
      isEnabledOfficePlaceOrigin: false,

      PlaceDestination: '',
      isEnabledPlaceDestination: true,
      OfficePlaceDestination: '',
      isEnabledOfficePlaceDestination: false,

      CityId: 0,

      StationsPlaceOrigin: [],
      StationsPlaceDestination: [],

      isLoading: false,
      isDisabled: false,

      isErrorPlaceOrigin: false,
      isErrorOfficePlaceOrigin: false,
      isErrorPlaceDestination: false,
      isErrorOfficePlaceDestination: false
    }
    
    this.handleChangeSelectPlace = this.handleChangeSelectPlace.bind(this);
    this.handleValidate          = this.handleValidate.bind(this);
    this._loadCity().done();
  }
  
  async componentDidMount(){
    if (this.state.typeTransfer === 'RECIBIR'){
      try {
        // Get data of user, if existe any.
        const car = await AsyncStorage.getItem('car');
        // If existe change to creen
        if (car !== null) {
          let car_json = JSON.parse(car);
          this.setState({
            isEnabledPlaceOrigin: false,
            PlaceOrigin: car_json.Car.Transfer.PickupCityId.toString(),
            OfficePlaceOrigin: car_json.Car.Transfer.PickupStationId.toString(),
          });
          axios.post(API.url, {
            CityId: this.state.PlaceOrigin,
            SessionId: this.state.SessionId,
            Id: '0',
            Action: "GetStationList"
          })
          .then((response) => {
            // Get response, if response (Success) was true change to screen
            if (response.data.result.Success && response.data.result.Success === true) {
              this.setState({ StationsPlaceOrigin: response.data.result.BaseObjectList });
            } else {
              alert(response.data.result.ErrorDescription);
            }
          })
          .catch((error) => {
            // If exist error finished animation and show error
            alert(error);
          });
        }
      } catch (error) {
        alert(error);
      }
    }
    console.log(this.state.OfficePlaceOrigin);
  }

  _loadCity= async () =>{
    // Do request to api send params at form
    axios.post(API.url, {
      SessionId: "1799979",
      Id: '0',
      Action: "GetCityList"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this.setState({ Cities: response.data.result.BaseObjectList});
        setTimeout( () => {
          this.setState({ isLoading: true });
        },1000);
      } else {
        alert(response.data.result.ErrorDescription);
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      alert(error);
    });
  }

  handleChangeSelectPlace(key, value) {
    this.setState({
      [key]: value,
      CityId: value,
      ["isEnabledOffice" + key]: false,
      ["isEnabled" +key]: false
    });
    setTimeout(() => {
      (this.state.CityId > 0) ? this._getStation(key) : this.setState({ ["Stations" + key]: [] });
    }, 1000);
  }

  _getStation(key){
    axios.post(API.url, {
      CityId: this.state.CityId,
      SessionId: this.state.SessionId,
      Id: '0',
      Action: "GetStationList"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        if (response.data.result.BaseObjectList === null){
          alert("No se han encontrado resultados");
          this.setState({
            ["isEnabledOffice" + key]: false,
            ["isEnabled" + key]: true
          });
        }else{
          this.setState({ ["Stations"+ key]: response.data.result.BaseObjectList });
          this.setState({
            ["isEnabledOffice" + key]: true,
            ["isEnabled" + key]: true
          });
        }
      } else {
        alert(response.data.result.ErrorDescription);
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      alert(error);
    });
  }

  handleValidate(){
    const { 
      PlaceOrigin, OfficePlaceOrigin, 
      PlaceDestination, OfficePlaceDestination
    } = this.state;
    // let inputFields = [
    //   { "name": "PlaceOrigin", "value": PlaceOrigin},
    //   { "name": "OfficePlaceOrigin", "value": OfficePlaceOrigin},
    //   { "name": "PlaceDestination", "value": PlaceDestination},
    //   { "name": "OfficePlaceDestination", "value": OfficePlaceDestination},
    // ];
    // inputFields.map((input, index) =>{
    //   (input.value === '') ? this.setState({ ["isError" + input.name]: true }) : this.setState({ ["isError" + input.name]: false });
    // }); 
    // return;
    if (PlaceOrigin === '' || OfficePlaceOrigin === '' || 
        PlaceDestination === '' || OfficePlaceDestination === ''){
      return alert("Se deben llenar todos los campos");
    }
    this.handleSubmit();
  }

  handleSubmit(){
    const  {
      PlaceOrigin, OfficePlaceOrigin,
      PlaceDestination, OfficePlaceDestination, 
      SessionId, typeTransfer
    } = this.state;
    this.setState({ isLoading: false, });

    axios.post(API.url, {
      PickupCityId: PlaceOrigin,
      PickupStationId: OfficePlaceOrigin,
      DropoffCityId: PlaceDestination,
      DropoffStationId: OfficePlaceDestination,
      SessionId: SessionId,
      Id:0,
      Action: "SetStationFromTo"
    })
    .then((response) => {
      // Get response, if response (Success) was true change to screen
      if (response.data.result.Success && response.data.result.Success === true) {
        this.setState({ isLoading: true });
        this.props.navigation.navigate('Verify', {
          SessionId: SessionId,
          type_transfer: typeTransfer,
        });
      } else {
        alert(response.data.result.ErrorDescription);
        this.setState({ isLoading: true });
      }
    })
    .catch((error) => {
      // If exist error finished animation and show error
      this.setState({ isLoading: true });
    });
  }

  render() {
    const { 
      Cities,
      PlaceOrigin,
      isEnabledPlaceOrigin,
      OfficePlaceOrigin, 
      isEnabledOfficePlaceOrigin,

      PlaceDestination, 
      isEnabledPlaceDestination,
      OfficePlaceDestination,
      isEnabledOfficePlaceDestination,

      isLoading,
      isDisabled,
      StationsPlaceOrigin,
      StationsPlaceDestination,

      isErrorPlaceOrigin,
      isErrorOfficePlaceOrigin,
      isErrorPlaceDestination,
      isErrorOfficePlaceDestination

    } = this.state;

    const pickerItems = Cities.map((item) => {
      return (<Picker.Item label={item.Name} value={item.Id} color={Colors.black} key={item.Id} />)
    });

    const itemsStationOrigin = StationsPlaceOrigin.map((item) => {
      return (<Picker.Item label={item.Name} value={item.Id} color={Colors.black} key={item.Id} />)
    });

    const itemsStationDestination = StationsPlaceDestination.map((item) => {
      return (<Picker.Item label={item.Name} value={item.Id} color={Colors.black} key={item.Id} />)
    });
    
    if (isLoading){

      return (      
        <View style={[common.flex_1, common.bg_white]}>
  
          <View style={[common.ml_10, common.mr_10]}>
            <Text style={[common.h2, common.text_other_black, common.pt_10, common.pb_10, common.text_other_black]}>
              Seleccione oficina de origen
            </Text>
  
            <View style={[common.border, common.mb_10, isErrorPlaceOrigin ? common.border_invalid : common.border_black_dark,]}>
              <Picker
                enabled={isEnabledPlaceOrigin}
                selectedValue={PlaceOrigin}
                onValueChange={value => this.handleChangeSelectPlace("PlaceOrigin", value) }>
                <Picker.Item label="Selecciona plaza origen" value="0" color={Colors.other_black} key={0} />
                {pickerItems}
              </Picker>
            </View>
  
            <View style={[common.border, isErrorOfficePlaceOrigin ? common.border_invalid : common.border_black_dark,]}>
              <Picker
                enabled={isEnabledOfficePlaceOrigin}
                selectedValue={OfficePlaceOrigin}
                onValueChange={value => this.setState({ OfficePlaceOrigin: value }) }>
                <Picker.Item label="Selecciona oficina origen" value="0" color={Colors.other_black} key={0} /> 
                {itemsStationOrigin}
              </Picker>
            </View>
            {/* First section select */}
  
            <Text style={[
              common.h2, 
              common.text_other_black, 
              common.pt_10, 
              common.pb_10,
              common.mt_10,
              common.text_other_black
            ]}>Seleccione oficina de destino</Text>
            <View style={[common.border, common.mb_10, isErrorPlaceDestination ? common.border_invalid : common.border_black_dark,]}>
              <Picker
                selectedValue={PlaceDestination}
                onValueChange={value => this.handleChangeSelectPlace("PlaceDestination", value)}>
                <Picker.Item label="Selecciona plaza destino" value="0" color={Colors.other_black} key={0}/>
                { pickerItems }
              </Picker>
            </View>
            <View style={[common.border, isErrorOfficePlaceDestination ? common.border_invalid : common.border_black_dark,]}>
              <Picker
                enabled={isEnabledOfficePlaceDestination}
                selectedValue={OfficePlaceDestination}
                onValueChange={ (value) => this.setState({ OfficePlaceDestination: value})}>
                <Picker.Item label="Selecciona oficina destino" value={0} color={Colors.other_black} key={0}/>
                {itemsStationDestination}
              </Picker>
            </View>
            {/* Second section select */}
  
          </View>
          {/* Container section selectors */}
  
          <View
            style={[
              common.display_flex,
              common.row,
              common.absolute,
              common.space_between,
              common.w_100,
              common.bottom_0,
              common.pb_20,
            ]}
          >

            <View style={[common.w_45_btn, common.ml_10]}>
              <Buttons
                borderColor={common.border_green}
                bg={common.bg_transparent}
                textLabel="REGRESAR"
                onPress={() => this.props.navigation.goBack()}
              />
            </View>

            <View style={[common.w_45_btn, common.mr_10]}>
              <Buttons
                isDisabled={isDisabled}
                disabled={isDisabled}
                borderColor={common.bg_yellow}
                bg={common.border_yellow}
                textLabel="SIGUIENTE"
                onPress={this.handleValidate}
              />
            </View>

          </View>
          {/* Botones */}
          {/* Botones */}
  
        </View>
        // Main containter
      );

    }else{
      return (
        <View style={styles.center}>
          <ActivityIndicator size={70} color="#037B00" />
          {/* <StatusBar barStyle="default" /> */}
        </View>
      );
    }
  }
}


const styles = StyleSheet.create({
  center: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});