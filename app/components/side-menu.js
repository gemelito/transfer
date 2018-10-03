import React from 'react';
import { View, Button } from 'react-native';

export default class SideMenu extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'column', marginTop:30, justifyContent: 'space-around'}}>
         <Button
              title="Consultar"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen1');
                this.props.navigation.closeDrawer();

              }}
          />
          <Button
              title="Cerrar session"
              onPress={() => {
                this.props.navigation.navigate('RootStackScreen3');
                this.props.navigation.closeDrawer();

              }}
            />
        </View>
      </View>
    );
  }
}
