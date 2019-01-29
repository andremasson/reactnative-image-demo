import React from 'react'
import { StyleSheet, Text, View, ImageEditor, TouchableOpacity, Image } from 'react-native'
import { ImagePicker } from 'expo'

export default class App extends React.Component {
  state = {
    image: null
  }
  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2,1]
    }).then((result) => {
      if (result.cancelled) {
        return
      }

      ImageEditor.cropImage(result.uri, {
        offset: { x: 0, y: 0 },
        size: { width: result.width, height: result.height },
        displaySize: { wisth: 200, height: 200 },
        resizeMode: 'contain'
      }, (uri) => this.setState(() => { image: uri }),
      () => console.log('Error'))
    })
  }
  render() {
    const { image } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.pickImage}>
          <Text>Open Camera Roll</Text>
        </TouchableOpacity>

        {image && (
          <Image style={styles.img} source={{uri: image}} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'black'
  }
});
