import React from 'react';
import {
  Alert,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

async function requestPermissionAsync(permission) {
  // Image Picker doesn't need permissions in the web
  if (Platform.OS === 'web') {
    return true;
  }
  const { status } = await Permissions.askAsync(permission);
  return status === 'granted';
}

export default class CreateScreen extends React.Component {
  state = {
    selection: null,
  };

  showCamera = async (mediaTypes, allowsEditing = false) => {
    await requestPermissionAsync(Permissions.CAMERA);
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    let result = await ImagePicker.launchCameraAsync({ mediaTypes, allowsEditing });
    if (cameraPermission.cancelled || cameraRollPermission.cancelled) {
      this.setState({ selection: null });
    } else {
      this.setState({ selection: result });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.showCamera(ImagePicker.MediaTypeOptions.Images)}
          title="Add Photo"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <FlatList
          data={[
            {key: 'Comment 1'},
            {key: 'Comment 2'},
            {key: 'Comment 3'},
            {key: 'Comment 4'},
            {key: 'Comment 5'},
            {key: 'Comment 6'},
          ]}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Inspection', {name: item})
              }}
            >
              <Text style={styles.item}>{item.key}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
