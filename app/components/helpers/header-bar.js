import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';

export default class HeaderBar extends React.Component {

  toggleDrawer=()=>{    
    this.props.navigationProps.toggleDrawer();
  }
  
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
          <Ionicons name="md-menu" size={32} color={Colors.green} style={{marginLeft: 10}}/>
        </TouchableOpacity>
      </View>
    );
  }
}