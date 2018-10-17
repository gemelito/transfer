import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Vibration,
  Dimensions 
} from 'react-native';
import { Camera, FileSystem, Permissions, ImagePicker } from 'expo';


import BtnOpenGallery from '../components/buttons/camera/open-gallery';
import BtnReverseCamera from '../components/buttons/camera/reverse-camera';
import BtnTakePhoto from '../components/buttons/camera/take-photo';
import BtnAddRemovePhoto from '../components/buttons/camera/add-remove-photo';

import common from '../constants/common';
const ex = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
}

export default class CameraScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      image: null,
      photoId: 1
    };
  }

  async componentDidMount() {
    try {
      let folder = FileSystem.documentDirectory + "photo"
      await FileSystem.makeDirectoryAsync(folder, {
        intermediates: true
      })

      var fi = await FileSystem.getInfoAsync(folder);

      alert(JSON.stringify(fi))
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
      // aspect: [4, 3]
    });

    if (!result.cancelled) {
      let image = result.uri;
      // this.setState({ image: result.uri });

      // move on
      // this.props.navigation.navigate('CreateFit', { image });
    }
  };

  takePicture = async () => {
    if (this.camera) {
    let photo = await this.camera.takePictureAsync();
    this.setState({
      photoId: this.state.photoId + 1,
      image: photo.uri
    });
    Vibration.vibrate();

    // this.camera.takePictureAsync().then(data => {
    //   const image = `${FileSystem.documentDirectory}photo/Photo_${
    //     this.state.photoId
    //     }.jpg`;

    //   FileSystem.moveAsync({
    //     from: data.uri,
    //     to: image
    //   }).then(() => {
    //     this.setState({
    //       photoId: this.state.photoId + 1,
    //       image: image
    //     });
    //     Vibration.vibrate();
    //     // this.props.navigation.navigate('CreateFit', { image });
    //   });
    // });

    // console.log(photo);
    }
  };

  render() {
    const { hasCameraPermission, image } = this.state;
    console.log(ex.width);
    
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={[common.flex_1]}>
          { image ?
            <Image
              source={{ uri: image }}
              style={{ width:ex.width, height:ex.height }}
            />
            :
            <Camera style={[common.flex_1]} type={this.state.type} ref={ref => {this.camera = ref; }} >              
              <View style={[ common.flex_1, {alignItems: 'center',justifyContent: 'flex-end'}]}>
                {/* Rirar la camara */}
                <BtnReverseCamera
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    });
                  }}
                  style={[common.absolute, common.bottom_0, common.pb_10, { right: 10 }]}
                />
                {/* Rirar la camara */}

                {/* Tomar la foto */}
                <BtnTakePhoto
                  style={[]}
                  onPress={this.takePicture}
                />
                {/* Tomar la foto */}
              </View>
            </Camera>
          }
          
          { !image ?
            // Abrir la galeria 
            <View style={[common.absolute, common.bottom_0, common.ml_10, common.pb_10]}>
              <BtnOpenGallery onPress={this.pickImage}/>
            </View>
            // Abrir la galeria 
            :

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
              <BtnAddRemovePhoto
                nameIcon="ios-remove-circle"
                onPress={() =>{

                    this.setState({
                      photoId: 1,
                      image: null
                    });
                  
                }}
              />
              <BtnAddRemovePhoto
                nameIcon="ios-add-circle"
                onPress={() => {
                  this.setState({
                    photoId: 1,
                    image: null
                  });
                  this.props.navigation.navigate('Search', { image: this.state.image });
                }}
              />
            </View>
            
          }
        </View>
      );
    }
  }
}