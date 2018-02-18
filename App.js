import React from 'react';
import {
  Font
} from 'expo';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  CameraRoll,
} from 'react-native';
import {
  Camera,
  Permissions
} from 'expo';
import {
  ImagePicker
} from 'expo';
import {
  Image,
  ImageBackground,
  Button
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <RootStack / > ;
  }
}
class HomeScreen extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      'Bungee-Regular': require('./assets/Bungee-Regular.ttf'),
    });
    await Image.loadAsync({
      'pieceoftrash': require('./assets/title.png'),
    });
    this.setState({
      textloading: false,
      imageloading: false
    })
  }
  state = {
    image: null,
    textloading: true,
    imageloading: true,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  }
  render() {
    if (this.state.imageloading) {
      return ( <
        ImageBackground source = {
          require('./assets/title.png')
        }
        style = {
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }
        } >

        <
        View style = {
          {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingVertical: 24
          }
        } >
        <
        CustomButton  title = "Click To Continue" onPress = {
            () => this.props.navigation.navigate('Details')
          } > Click To Continue < /CustomButton>
          </View >
        <
        /ImageBackground>);
      }
    }
  };
  class DetailsScreen extends React.Component {
    async componentDidMount() {
   await Font.loadAsync({
     'Bungee-Regular': require('./assets/Bungee-Regular.ttf'),
   });
   this.setState({loading: false})
 }
 state = {
   image: null,
   loading: true,
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
       }}/>
   );
 }

 render() {
   let { image } = this.state;
   const { hasCameraPermission } = this.state;
   if (this.state.loading || hasCameraPermission === null) {
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

           <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, paddingVertical: 24}}>
               <CustomButton onPress={this._pickImage}>Take Picture</CustomButton>
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
           ...StyleSheet.absoluteFillObject,
           backgroundColor: 'white',
           alignItems: 'center',
           justifyContent: 'center',
         }}>

       <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, paddingVertical: 24}}>

<CustomButton onPress={() => {   }}>Recycle</CustomButton>
<CustomButton onPress={() => {   }}>Trash</CustomButton>
         <CustomButton onPress={() => {   }}>Compost</CustomButton>
         </View>
       </ImageBackground>
     );
   }
 };
 _pickImage = async () => {
   const { base64: data, width, height } = await this.camera.takePictureAsync({
     base64: true,
   });
   this.setState({ width, height, image: 'data:image/jpg;base64,' + data });
 };
}
const RootStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
}, {
  initialRouteName: 'Home',
});
const CustomButton = ({
  onPress,
  style,
  children
}) => ( <
  TouchableOpacity style = {
    [{
      backgroundColor: 'red'
    }, style]
  }
  onPress = {
    onPress
  } >
  <
  Text style = {
    {
      textAlign: 'center',
      color: 'white',
      fontSize: 22,
      fontFamily: 'Bungee-Regular',
      margin: 6
    }
  } > {
    children
  } <
  /Text> < /
  TouchableOpacity >
)
