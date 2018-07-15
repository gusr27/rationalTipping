import React, {Component} from 'react';
import { View, Image } from 'react-native';
import {Icon,Text} from 'native-base'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import firebase from 'firebase'
import 'firebase/firestore'
import db from './firebase'

class GoogleMaps extends Component{

  constructor(props){
    super(props)
  }



  componentWillMount(){

  }



  storeStoreLocation(data,details){
    db.collection('storesTipped').doc('jMvrkejCdGl8t7fGet1b').update({name:data.name})
  }

  render(){
    // Initialize Firebase



  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description || row.formatted_address || row.name} // custom description render
      onPress={(data, details) => { // 'details' is provided when fetchDetails = true
        this.storeStoreLocation(data, details)
      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyDSXq6eIEM-SCVYqn7wUVfwk9BGjylQYwU',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: 'black'
        },
        description:{
          color:'black'

        }
      }}

      currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'restaurant',
        opennow:'true'
      }}

      filterReverseGeocodingByTypes={['(regions)', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      renderLeftButton={()  => <Icon type="FontAwesome" name="arrow-left" />}
      //renderRightButton={() => <Text>Enter Where You're Eating</Text>}
    />
  )}
}

export default GoogleMaps
