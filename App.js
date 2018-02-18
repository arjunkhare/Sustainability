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

export default class CameraExample extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      'Bungee-Regular': require('./assets/Bungee-Regular.ttf'),
    });
    async _loadAssetsAsync() {
      const imageAssets = cacheImages([
        require('./assets/title.png'),
      ]);
    }
    const imageAssets = cacheImages([
      require('./assets/title.png'),
    ]);
    const fontAssets = cacheFonts([FontAwesome.font]);
    await Promise.all([...imageAssets, ...fontAssets]);
  }
  this.setState({
    loading: false
  })
}
state = {
  image: null,
  loading: true,
  hasCameraPermission: null,
  type: Camera.Constants.Type.back,
};
async componentWillMount() {
  const {
    status
  } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({
    hasCameraPermission: status === 'granted'
  });
}
get footer() {
  return ( <
    View style = {
      {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
      }
    }
    />
  );
}
render() {
  let {
    loading
  } = this.state;
  const {
    hasCameraPermission
  } = this.state;
  if (loading || hasCameraPermission === null) {
    return <View / > ;
  } else if (hasCameraPermission === false) {
    return <Text > No access to camera < /Text>;
  } else {
    return ( <
      ImageBackground source = {
        'title'
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
          paddingVertical: 34
        }
      } >

      <
      CustomButton onPress = {
        () => {}
      } > Click Anywhere To Continue < /CustomButton> < /
      View > <
      /ImageBackground>
    );
  }
}
}
/*renderTakeImage() {
  let {
    image
  } = this.state;
  const {
    hasCameraPermission
  } = this.state;
  if (this.state.loading || hasCameraPermission === null) {
    return <View / > ;
  } else if (hasCameraPermission === false) {
    return <Text > No access to camera < /Text>;
  } else {
    return ( <
      View style = {
        {
          flex: 1
        }
      } >
      <
      Camera style = {
        {
          flex: 1
        }
      }
      ref = {
        ref => (this.camera = ref)
      }
      type = {
        this.state.type
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
          paddingVertical: 34
        }
      } >
      <
      CustomButton onPress = {
        this._pickImage
      } > Take Picture < /CustomButton> <
      /View> <
      /Camera> {
        this.renderImage()
      } <
      /View>
    );
  }
}*/
renderImage = () => {
  if (this.state.image != null) {
    return ( <
      ImageBackground source = {
        {
          uri: this.state.image
        }
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
          paddingVertical: 34
        }
      } >

      <
      CustomButton onPress = {
        () => {}
      } > Recycle < /CustomButton> <
      CustomButton onPress = {
        () => {}
      } > Trash < /CustomButton> <
      CustomButton onPress = {
        () => {}
      } > Compost < /CustomButton> < /
      View > <
      /ImageBackground>
    );
  }
};
_pickImage = async () => {
  const {
    base64: data,
    width,
    height
  } = await this.camera.takePictureAsync({
    base64: true,
  });
  this.setState({
    width,
    height,
    image: 'data:image/jpg;base64,' + data
  });
}

/*
<TouchableOpacity
  style={{
    flex: 0.1,
  }}
  onPress={console.log("nanas")}>
  <Text
  style={{
    textAlign: 'center',
    color: 'white',
    left: -122,
    top: 313,
    fontSize: 18,
    fontFamily: 'Bungee-Regular',
  }}>
    {' '}Recycle{' '}
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={{
    flex: 0.1,
  }}
  onPress={console.log("nanas")}>
  <Text
  style={{
    textAlign: 'center',
    color: 'white',
    left: -3,
    top: 247,
    fontSize: 18,
    fontFamily: 'Bungee-Regular',
  }}>
    {' '}Trash{' '}
  </Text>
</TouchableOpacity>
<TouchableOpacity
  style={{
    flex: 0.1,
  }}
  onPress={console.log("nanas")}>
  <Text
  style={{
    textAlign: 'center',
    color: 'white',
    left: 112,
    top: 180,
    fontSize: 18,
    fontFamily: 'Bungee-Regular',
  }}>
    {' '}Compost{' '}
  </Text>
</TouchableOpacity>
*/

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
