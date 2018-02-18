import React from 'react';
import { Font } from 'expo';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  CameraRoll,
} from 'react-native';
import { Camera, Permissions } from 'expo';
import { ImagePicker } from 'expo';
import { Image, ImageBackground } from 'react-native';
import React, {Component} from 'react';
componentDidMount(){
  
}
export default class CameraExample extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'Bungee-Regular': require('./assets/Bungee-Regular.ttf'),
    });
  }
  state = {
    image: null,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  get footer() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          flexDirection: 'row',
        }}
      />
    );
  }
  render() {
    let { image } = this.state;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            ref={ref => (this.camera = ref)}
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  console.log('fff');
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 600,
                    marginLeft: 550,
                    color: 'white',
                    fontFamily: 'Bungee-Regular',
                  }}>
                  {' '}Flip Camera{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignItems: 'right',
                }}
                onPress={this._pickImage}>
                <Text
                  style={{
                    fontSize: 18,
                    marginTop: 500,
                    marginLeft: 100,
                    marginBottom: 100,
                    fontFamily: 'Bungee-Regular',
                    color: 'white',
                  }}>
                  {' '}Take Picture{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          {this.renderImage()}
        </View>
      );
    }
  }

  renderImage = () => {
    if (this.state.image != null) {
      return (
        <ImageBackground
          source={{ uri: this.state.image }}
          style={{
            resizeMode: 'contain',
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'orange',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              position: 'absolute',
              left: 50,
              bottom: 100,
              fontSize: 18,
              fontFamily: 'Bungee-Regular',
            }}>
            Recycle
          </Text>
          onPress={this._pickImage}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              position: 'absolute',
              left: 165,
              bottom: 100,
              fontSize: 18,
              fontFamily: 'Bungee-Regular',
            }}>
            Compost
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              position: 'absolute',
              left: 300,
              bottom: 100,
              fontSize: 18,
              fontFamily: 'Bungee-Regular',
            }}>
            Trash
          </Text>
        </ImageBackground>
      );
    }
  };
  _pickImage = async () => {
    const { base64: data, width, height } = await this.camera.takePictureAsync({
      quality: 1,
      base64: true,
      exif: false,
    });
    //                   await CameraRoll.saveToCameraRoll(picture);
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   aspect: [4, 3],
    // });

    // console.log(result);
    // if (!result.cancelled) {
    this.setState({ width, height, image: 'data:image/jpg;base64,' + data });
    // }
  };
}
