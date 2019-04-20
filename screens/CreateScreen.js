import React from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';


export default class CreateScreen extends React.Component {
  static navigationOptions = {
    title: 'Create New Inspection',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'General'},
            {key: 'Site'},
            {key: 'Exterior'},
            {key: 'Bathrooms'},
            {key: 'Kitchen'},
            {key: 'Roofing'},
            {key: 'Structure'},
            {key: 'Interior'},
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
