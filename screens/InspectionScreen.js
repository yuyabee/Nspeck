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
  Switch,
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
  exterior: {
    covering: "",
    trim_material_description: "",
    trim_material_condition: "",
    windows_description: "",
    windows_condition: "",
    entry_doors_description: "",
    entry_doors_condition: "",
    balconies_description: "",
    railings_description: "",
    railings_condition: "",
  },
  garage: {
    type_description: "",
    type_condition: "",
    size_description: "",
    size_condition: "",
    door_opener_condition: "",
    door_opener_description: "",
    opener_safety_feature_condition: "",
    opener_safety_feature_description: "",
  },
  roofing: {
    inspect_method_description: "",
    inspect_method_condition: "",
    design_description: "",
    design_condition: "",
    covering_description: "",
    covering_condition: "",
    approximate_roof_age: "",
    ventilation_present: false,
    ventilation_description: "",
    ventilation_condition: "",
    chimney_description: "",
    chimney_condition: "",
    sky_lights_description: "",
    sky_lights_condition: "",
    flashings_description: "",
    flashings_condition: "",
    soffit_fascia_description: "",
    soffit_fascia_condition: "",
    gutters_downspouts_description: "",
    gutters_downspouts_condition: "",
  },
  structure: {
    foundation_types_description: "",
    foundation_types_condition: "",
    foundation_material_description: "",
    foundation_material_condition: "",
    signs_of_water_penetration: false,
    water_penetration_description: "",
    water_penetration_condition: "",
    prior_waterproofing_description: "",
    prior_waterproofing_condition: "",
    floor_description: "",
    floor_condition: "",
    subflooring_description: "",
    subflooring_condition: "",
    wall_description: "",
    wall_condition: "",
  },
  electrical: {
    type_of_service_description: "",
    type_of_service_condition: "",
    main_disconnect_location_description: "",
    main_disconnect_location_condition: "",
    service_panel_location_description: "",
    service_panel_location_condition: "",
  },
  hvac: {
    system_type_description: "",
    system_type_condition: "",
  },
  heating: {
    location_description: "",
    location_condition: "",
    type_of_equipment_description: "",
    type_of_equipment_condition: "",
    manufacturer_description: "",
  },
  cooling: {
    energy_source: "",
    type_of_equipment_description: "",
    type_of_equipment_condition: "",
    condenser_make: "",
    condenser_size: "",
    expansion_coil_make: "",
  },
  plumbing: {
    water_service: "",
    supply_pump_material_description: "",
    supply_pump_material_condition: "",
    location_of_water_shutoff: "",
  }
}

export default class CreateScreen extends React.Component {
  state = {
    selection: null,
  };

  static navigationOptions = (props) => {
    return {
      title: props.navigation.state.params.name,
    }
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
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
            "Repair or Replace", "Further evaluation required", "Not present",
            "Not inspected",
          ],
        }
      }],
      "exterior": [{
        "covering": {
          "field_type": "select_field",
          "options": [
            "Brick",
            "Vinyl Siding",
            "Aluminum Siding",
            "Exterior insulated finish system",
            "Stucco",
            "Stone",
            "Lap Wood",
            "Cement Shingles",
            "Wood Tongue and Groove",
          ]
        },
        "trim_material_description": {
          "field_type": "select_field",
          "options": [
            "Wood",
            "Vinyl",
            "Aluminum",
          ],
        },
        "trim_material_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "windows_description": {
          "field_type": "select_field",
          "options": [
            "Wood",
            "Metal clad",
            "Vinyl",
            "Aluminum",
          ],
        },
        "windows_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "entry_doors_description": {
          "field_type": "select_field",
          "options": [
            "Wood",
            "Vinyl",
            "Fiberglass",
            "Steel",
          ],
        },
        "entry_doors_condition": {
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
        "balconies_description": {
          "field_type": "select_field",
          "options": [
            "Wood",
            "Concrete",
          ],
        },
        "railings_description": {
          "field_type": "select_field",
          "options": [
            "Wood",
            "Vinyl",
            "Metal",
          ],
        },
        "railings_condition": {
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
      }],
      "garage": [{
        "type_description": {
          "field_type": "select_field",
          "options": [
            "Attached",
            "Detached",
            "Basement",
            "Carport",
          ]
        },
        "type_condition": {
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
        "size_description": {
          "field_type": "select_field",
          "options": [
            "1 car",
            "1.5 cars",
            "2 cars",
            "2.5 cars",
            "3 cars",
          ]
        },
        "size_condition": {
          "field_type": "select_field",
          "options": [
            "Not present",
            "Not inspected",
          ],
        },
        "door_opener_description": {
          "field_type": "select_field",
          "options": [
            "Manual opening",
            "Chain drive",
            "Belt drive",
            "Screw drive",
          ]
        },
        "door_opener_condition": {
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
        "opener_safety_feature_description": {
          "field_type": "select_field",
          "options": [
            "Light Beam",
            "Force Sensitive",
          ],
        },
        "opener_safety_feature_condition": {
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
      }],
      "roofing": [{
        "inspect_method_description": {
          "field_type": "select_field",
          "options": [
            "From ground with binoculars",
            "Walked Roof/Arms length",
          ]
        },
        "inspect_method_condition": {
          "field_type": "select_field",
          "options": [
            "Not present",
            "Not inspected",
          ]
        },
        "design_description": {
          "field_type": "select_field",
          "options": [
            "Gable",
            "Hip",
            "Duch Hip",
            "Mansard",
            "Hexagonal Gazebo",
            "Flat",
          ],
        },
        "design_condition": {
          "field_type": "select_field",
          "options": [
            "Not present",
            "Not inspected",
          ]
        },
        "covering_description": {
          "field_type": "select_field",
          "options": [
            "3 Tab Shingle",
            "Concrete Tile",
            "Clay Barrel Tile",
            "Metal",
            "Gravel",
            "Roll Roofing",
          ],
        },
        "covering_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "approximate_roof_age": {
          "field_type": "select_field",
          "options": [
            "0 - 2 years",
            "3 - 5 years",
            "6 - 8 years",
            "9 - 10 years",
            "11+ years",
          ],
        },
        "ventilation_present": {
          "field_type": "switch_field",
        },
        "ventilation_description": {
          "field_type": "select_field",
          "options": [
            "Roof",
            "Soffit",
            "Power Ventilator",
            "Gable Ends",
            "Ridge Vents",
            "Turbine",
          ]
        },
        "ventilation_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "chimney_description": {
          "field_type": "select_field",
          "options": [
            "Masonry",
            "Brick",
            "Stone",
            "Metal",
            "Wood Frame",
          ]
        },
        "chimney_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "sky_lights_description": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "sky_lights_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "flashings_description": {
          "field_type": "select_field",
          "options": [
            "Metal",
            "Tar/Caulk",
            "Asphalt",
          ]
        },
        "flashings_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "soffit_fascia_description": {
          "field_type": "select_field",
          "options": [
            "Wood",
            "Aluminum",
            "Vinyl",
          ]
        },
        "soffit_fascia_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "gutters_downspouts_description": {
          "field_type": "select_field",
          "options": [
            "Metal",
            "Plastic",
            "Hidden Box",
          ]
        },
        "gutters_downspouts_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
      }],
      "structure": [{
        "foundation_types_description": {
          "field_type": "select_field",
          "options": [
            "Basement",
            "Slab on Grade",
            "Floating Slab",
            "Crawl Space",
          ]
        },
        "foundation_types_condition": {
          "field_type": "select_field",
          "options": [
            "Not present",
            "Not inspected",
          ]
        },
        "foundation_material_description": {
          "field_type": "select_field",
          "options": [
            "Poured Concrete",
            "Concrete Block",
            "Wood",
            "Stone",
          ],
        },
        "foundation_material_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "signs_of_water_penetration": {
          "field_type": "switch_field",
        },
        "water_penetration_description": {
          "field_type": "select_field",
          "options": [
            "Moisture",
            "Dampness",
            "Stains",
            "Efflorescence",
            "Mildew",
          ]
        },
        "water_penetration_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ],
        },
        "prior_waterproofing_description": {
          "field_type": "select_field",
          "options": [
            "Perimeter Drain",
            "Expoxy Injection",
            "Plastic Panels",
            "Surface Patches",
            "Gutter Type Drain",
          ]
        },
        "prior_waterproofing_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "floor_description": {
          "field_type": "select_field",
          "options": [
            "Concrete Slab",
            "Wood Frame",
            "Engineered I-Joist",
            "Truss",
          ]
        },
        "floor_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "subflooring_description": {
          "field_type": "select_field",
          "options": [
            "Plywood",
            "Oriented Strand Board",
            "Solid Wood Plank",
            "Tongue and Groove Wood",
          ]
        },
        "subflooring_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "wall_description": {
          "field_type": "select_field",
          "options": [
            "Full Masonry",
            "Wood Frame",
          ]
        },
        "wall_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
      }],
      "electrical": [{
        "type_of_service_description": {
          "field_type": "select_field",
          "options": [
            "Overhead",
            "Underground",
          ]
        },
        "type_of_service_condition": {
          "field_type": "select_field",
          "options": [
            "Not present",
            "Not inspected",
          ]
        },
        "main_disconnect_location_description": {
          "field_type": "select_field",
          "options": [
            "Service Panel",
            "Meter box",
            "Split Bus Configuration",
          ],
        },
        "main_disconnect_location_condition": {
          "field_type": "select_field",
          "options": [
            "Not Present",
            "Not Inspected",
          ]
        },
        "service_panel_location_description": {
          "field_type": "select_field",
          "options": [
            "Exterior",
            "Basement",
            "Garage",
            "Interior",
          ]
        },
        "service_panel_location_condition": {
          "field_type": "select_field",
          "options": [
            "Not Present",
            "Not Inspected",
          ],
        },
      }],
      "hvac": [{
        "system_type_description": {
          "field_type": "select_field",
          "options": [
            "Central split system",
            "Package unit",
            "Wall unit",
          ]
        },
        "system_type_condition": {
          "field_type": "select_field",
          "options": [
            "Not present",
            "Not inspected",
          ]
        },
      }],
      "heating": [{
        "location_description": {
          "field_type": "select_field",
          "options": [
            "Basement",
            "Hallway",
            "Bedroom",
            "Kitchen",
            "Attic",
          ]
        },
        "location_condition": {
          "field_type": "select_field",
          "options": [
            "Not present",
            "Not inspected",
          ]
        },
        "type_of_equipment_description": {
          "field_type": "select_field",
          "options": [
            "Forced Air",
            "Heat Pump",
            "Gravity",
            "Boiler",
          ]
        },
        "type_of_equipment_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "manufacturer_description": {
          "field_type": "select_field",
          "options": [
            "Carrier",
            "Emerson",
            "General Electric",
            "Lennox",
            "Maytag",
            "Trane",
            "Westinghouse",
            "Whirlpool",
            "York",
            "Not Present",
          ]
        },
      }],
      "cooling": [{
        "energy_source": {
          "field_type": "select_field",
          "options": [
            "Electric",
            "Not Present",
            "Not Inspected",
          ]
        },
        "type_of_equipment_description": {
          "field_type": "select_field",
          "options": [
            "Split system",
            "Evaporative",
          ]
        },
        "type_of_equipment_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "condenser_make": {
          "field_type": "select_field",
          "options": [
            "Carrier",
            "Emerson",
            "General Electric",
            "Lennox",
            "Maytag",
            "Trane",
            "Westinghouse",
            "Whirlpool",
            "York",
            "Not Present",
          ]
        },
        "condenser_size": {
          "field_type": "select_field",
          "options": [
            "12,000 BTU (1 ton)",
            "18,000 BTU (1.5 tons)",
            "24,000 BTU (2 tons)",
            "30,000 BTU (2.5 tons)",
            "36,000 BTU (3 tons)",
            "42,000 BTU (3.5 tons)",
            "48,000 BTU (4 tons)",
            "52,000 BTU (4.5 tons)",
            "60,000 BTU (5 tons)",
            "Not Present",
            "Not inspected",
          ]
        },
        "expansion_coil_make": {
          "field_type": "select_field",
          "options": [
            "Carrier",
            "Emerson",
            "General Electric",
            "Lennox",
            "Maytag",
            "Trane",
            "Westinghouse",
            "Whirlpool",
            "York",
            "Not Present",
          ]
        },
      }],
      "plumbing": [{
        "water_service": {
          "field_type": "select_field",
          "options": [
            "Public",
            "Well System",
            "Unknown",
            "Not Present",
            "Not Inspected",
          ]
        },
        "supply_pump_material_description": {
          "field_type": "select_field",
          "options": [
            "Copper",
            "Galvanized",
            "PEX",
            "PVC",
            "CPVC",
            "Polybutelyne",
            "Bronzite",
          ]
        },
        "supply_pump_material_condition": {
          "field_type": "select_field",
          "options": [
            "Satisfactory",
            "Marginal",
            "Repair or Replace",
            "Further Evaluation required",
            "Not present",
            "Not inspected",
          ]
        },
        "location_of_water_shutoff": {
          "field_type": "select_field",
          "options": [
            "At meter",
            "Basement",
            "Crawlspace",
            "Interior",
            "By Water heater",
            "Not located",
            "Not present",
            "Not inspected",
          ]
        },
      }]
    };

    let props = this.props.navigation.state.params;

    // console.log(props.state[[props.name, Object.entries(forms[props.name][0])[0][0]].join("_")])

    return (
      <View style={styles.container}>
        {Object.entries(forms[props.name][0]).map(entry => (
          <View key={entry[0]}>
            <Text style={{fontSize: 24, color: "purple", textAlign: 'center'}}>{entry[0]}</Text>
            {(entry[1]["field_type"] == "select_field") ? 
              <Picker
                selectedValue={this.state[entry[0]]}
                style={{height: 120, width: 360, marginLeft: 40, marginBottom: 70}}
                onValueChange={(itemValue, itemIndex) =>
                  // props.update([props.name, entry[0]].join("_"), itemValue)
                  this.setState({[entry[0]]: itemValue})
                }
              >
                {(entry[1]["options"]).map(option => <Picker.Item key={option} label={option} value={option} />)}
              </Picker>
                : (entry[1]["field_type"] == "switch_field") ?
                <Switch
                  onValueChange={(val) => this.setState({[entry[0]]: val})}
                  value={this.state[entry[0]]}
                />
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
