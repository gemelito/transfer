import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';

import Buttons from '../components/buttons/button';
import common from '../constants/common';

const IMAGE_TRANSFER = require('../../assets/car_transfer.png');
const IMAGE_RECEIVE = require('../../assets/car_receive.png');

import { StackActions, NavigationActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Search' })],
});

export default class Finalize extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      type_tranfer: this.props.navigation.getParam('type_transfer', 'NO-TYPE-TRANSFER'),
      isLoading: false

    };

  }

  componentDidMount() {
    // this._loadInitialState().done();
  }

  render() {
    const { type_tranfer } = this.state;
    return (
      <View style={[common.flex_1, common.bg_white, common.center]}>
        {type_tranfer === 'TRASLADO' ?
          <Image source={IMAGE_TRANSFER}/>
          :
          <Image source={IMAGE_RECEIVE}/>
        }
        <Text style={[common.text_other_black, common.h2, common.bold, common.mt_10, common.pt_10, common.text_center]}>Traslado asignado conduzca con precaución</Text>
        <View style={[common.display_flex,common.row,common.absolute,common.bottom_0,common.pb_20,]}>
          <View style={[common.w_100, common.pl_10, common.pr_10]}>
            <Buttons
              borderColor={common.bg_yellow}
              bg={common.border_yellow}
              textLabel="FINALIZADO"
              onPress={() => this.props.navigation.dispatch(resetAction) }
            />
          </View>
        </View>
      </View>
    );
  }
}