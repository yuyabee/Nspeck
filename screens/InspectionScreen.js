import React from 'react';
import {
  Alert,
  Button,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Platform,
  Image,
  TextInput,
  Picker,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';

async function requestPermissionAsync(permission) {
  if (Platform.OS === 'web') {
    return true;
  }
  const { status } = await Permissions.askAsync(permission);
  return status === 'granted';
}

const properties = {
  general: {
    property_type: "",
    stories: "",
    approximate_age: "",
    bedrooms_baths: "",
    door_faces: "",
    furnished: "",
    weather: "",
    temperature: "",
    soil_condition: "",
    utilities_on_during_inspection: "",
    photos: [],
    comments: [],
  },
  site: {
    site_grading_description: "",
    site_grading_condition: "",
    vegetation_description: "",
    vegetation_condition: "",
    retaining_walls_description: "",
    retaining_walls_condition: "",
    driveway_description: "",
    driveway_condition: "",
    walkways_description: "",
    walkways_condition: "",
    steps_stoops_condition: "",
    steps_stoops_description: "",
    patios_decks_description: "",
    patios_decks_condition: "",
  },
}

export default class CreateScreen extends React.Component {
  state = {
    selection: null,
  };

  componentDidMount() {
    this.setState({...this.state, ...properties[this.props.name]})
  }

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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Button
            onPress={() => this.showCamera(ImagePicker.MediaTypeOptions.Images)}
            title="Add Photo"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

          {this._maybeRenderSelection()}

          {this._render_form()}

          <FlatList
            data={this.state.comments}
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
        </ScrollView>
      </View>
    );
  };

  _render_form() {
    var forms = {
      "general": [{
        "property_type": {
          "field_type": "select_field",
          "options": [
            "Single family",
            "Condo",
            "Townhouse/Villa",
            "Multi Family",
            "Other",
          ]
        },
        "stories": {
          "field_type": "select_field",
          "options": [
            "One",
            "Two",
            "Split Level",
            "One and a half",
            "Other",
          ],
        },
        "approximate_age": {
          "field_type": "text_field",
          "text": "approximate_age",
        },
        "bedrooms_baths": {
          "field_type": "text_field",
          "text": "bedrooms_baths",
        },
        "door_faces": {
          "field_type": "select_field",
          "options": [
            "North",
            "Northeast",
            "East",
            "Southeast",
            "South",
            "Southwest",
            "West",
            "Northwest",
          ]
        },
        "furnished": {
          "field_type": "select_field",
          "options": [
            "Yes",
            "No",
            "Partially"
          ]
        },
        "weather": {
          "field_type": "select_field",
          "options": [
            "Sunny",
            "Overcast",
            "Drizzle",
            "Raining",
          ]
        },
        "temperature": {
          "field_type": "select_field",
          "options": [
            "Hot",
            "Warm",
            "Cool",
            "Cold",
            "Not present",
            "Not inspected",
          ]
        },
        "soil_condition": {
          "field_type": "select_field",
          "options": [
            "Dry",
            "Damp",
            "Wet",
            "Snow",
            "Frozen",
            "Not present",
            "Not inspected",
          ]
        },
        "utilities_on_during_inspection": {
          "field_type": "select_field",
          "options": [
            "Electric service",
            "Gas service",
            "Water service",
            "Not present",
            "Not inspected",
          ]
        }
      }],
      "site": [{
        "site_grading_description": {
          "field_type": "select_field",
          "options": [
            "Mostly level",
            "Sloped away from structure",
            "Sloped away toward structure",
          ]
        },
        "site_grading_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ],
        },
        "vegetation_description": {
          "field_type": "select_field",
          "options": [
            "Growing against structure",
            "Not growing against structure",
            "Generally overgrown",
            "Generally maintained",
            "Not inspected",
          ]
        },
        "vegetation_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ],
        },
        "retaining_walls_description": {
          "field_type": "select_field",
          "options": [
            "Concrete",
            "Masonry",
            "Wood",
            "Not inspected",
          ]
        },
        "retaining_walls_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ],
        },
        "driveway_description": {
          "field_type": "select_field",
          "options": [
            "Concrete",
            "Stamped Concrete",
            "Stone",
            "Brick",
            "Pavers",
            "Gravel",
            "Asphalt",
          ],
        },
        "driveway_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ],
        },
        "walkways_description": {
          "field_type": "select_field",
          "options": [
                "Concrete",
                "Stamped Concrete",
                "Brick",
                "Pavers",
                "Gravel",
                "Asphalt",
              ],
        },
        "walkways_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ],
        },
        "steps_stoops_description": {
          "field_type": "select_field",
          "options": [
            "Concrete",
            "Stamped Concrete",
            "Brick",
            "Pavers",
            "Gravel",
            "Asphalt",
          ],
        },
        "steps_stoops_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ],
        },
        "patios_decks_description": {
          "field_type": "select_field",
          "options": [
            "Concrete",
            "Stamped Concrete",
            "Brick",
            "Pavers",
            "Stone",
            "Wood",
          ],
        },
        "patios_decks_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ],
        }
      }]
    };

    let props = this.props.navigation.state.params;

    // console.log(props.state[[props.name, Object.entries(forms[props.name][0])[0][0]].join("_")])

    return (
      <View style={styles.container}>
        {Object.entries(forms[props.name][0]).map(entry => (
          <View key={entry[0]}>
            <Text>{entry[0]}</Text>
            {(entry[1]["field_type"] == "select_field") ? 
              <Picker
                selectedValue={this.state[entry[0]]}
                style={{height: 50, width: 400}}
                onValueChange={(itemValue, itemIndex) =>
                  // props.update([props.name, entry[0]].join("_"), itemValue)
                  this.setState({[entry[0]]: itemValue})
                }
              >
                {(entry[1]["options"]).map(option => <Picker.Item key={option} label={option} value={option} />)}
              </Picker>
                :
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 350}}
                  onChangeText={(txt) => this.setState({[entry[0]]: txt})}
                  placeholder={entry[1]["text"]}
                  value={this.state[entry[0]]}
                />
            }
          </View>
        ))}
      </View>
    )
  };

  _maybeRenderSelection = () => {
    const { selection } = this.state;

    if (!selection) {
      return;
    }

    const media =
      <Image
        source={{ uri: selection.uri }}
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
      />

    return (
      <View style={{ marginVertical: 16 }}>
        <View
          style={{
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#000000',
          }}>
          {media}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    marginBottom: 20,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
