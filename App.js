import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter,
  Platform
} from 'react-native';

export default class App extends Component {

  openComposeModule = () => {
    if (Platform.OS === "ios") {
      NativeModules.ComposeModuleBridge.start();
      const events = new NativeEventEmitter(NativeModules.Emitter);
      events.addListener(
        "finish",
        url => console.log(url)
      )
    } else if (Platform.OS === "android") {
      startAndroid();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.wrapper, styles.border]}
          onPress={this.openComposeModule}
        >
          <Text style={styles.button}>
            {"Open"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "stretch"
  },
  wrapper: {
    flex: 1, alignItems: "center", justifyContent: "center"
  },
  border: {
    borderColor: "#eee", borderBottomWidth: 1
  },
  button: {
    fontSize: 50, color: "#6d2077"
  }
});

async function startAndroid() {
  try {
    var url = await NativeModules.ActivityResultModule.start();

    console.log(url);
  } catch (e) {
    console.log(e);
  }
}