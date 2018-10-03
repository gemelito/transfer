import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import Colors from '../constants/colors';

export default class StatefulButton extends Component {

	constructor(props) {
		super(props);
		this.colorValue = new Animated.Value(0);
		this.state = {
			is_loading: false
		}
	}

	changeColor() {
	  this.setState({
	  	is_loading: true
	  });

	  this.colorValue.setValue(0);
	  Animated.timing(this.colorValue, {
	    toValue: 100,
	    duration: 3000
	  }).start(() => {
	  	this.setState({
	  		is_loading: false
	  	});
	  });  
	}

	onPress() {
		this.changeColor();
	}

	render() {

		const colorAnimation = this.colorValue.interpolate({
		  inputRange: [0, 50, 100],
		  outputRange:[ Colors.black, Colors.black_dark, Colors.other_black]
		});

		return (
			<TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <Animated.View 
          style={[
            styles.button_container,
            console.log(this.props.styles),
					  this.props.styles ? this.props.styles.button : '',
					{
						backgroundColor: colorAnimation
					},
					]}
        >
          { 
            this.state.is_loading && 
            <Image
              style={styles.loader}
              source={require('../../assets/loading.gif')}
            />
          }
          <Text style={this.props.styles.label}>
            { this.state.is_loading ? 'loading...' : this.props.label}
          </Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	button_container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white'
	},

  loader: {
    width: 16,
    height: 16,
    marginRight: 10
  }
});