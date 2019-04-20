import React from 'react';
import { Alert, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';



export default class CreateScreen extends React.Component {
  state = {
    general: {},
    site: {},
    exterior: {},
    bathrooms: {},
    kitchen: {},
    roofing: {},
    interior: {},
  };

  static navigationOptions = {
    title: 'Create New Inspection',
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'General'},
            {key: 'Site'},
            {key: 'Exterior'},
            {key: 'Garage'},
            {key: 'Roofing'},
          ]}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Inspection', {
                  name: item["key"].toLowerCase(),
                  state: this.state,
                  update: this.update
                })
              }}
            >
              <Text style={styles.item}>{item.key}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  update = (item, value) => {
    console.log(this.state[item])
    this.setState({item: value})
  };
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
