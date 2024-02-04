import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin } from '../../../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';  //this will handle the display of the routes
import { GOOGLE_MAPS_API_KEY } from '@env';

export const Map = () => {
  const origin = useSelector(selectOrigin); // origin may be null or undefined
  const destination = useSelector(selectDestination);

  // Use default coordinates if origin or origin.location is not available
  const defaultCoordinates = {
    latitude: 40.7128, // New York City latitude
    longitude: -74.0060, // New York City longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Determine the coordinates to use for the map's initialRegion
  const initialRegion = origin?.location ? {
    latitude: origin.location.lat,
    longitude: origin.location.lng,
    latitudeDelta: 0.005, 
    longitudeDelta: 0.005,
  } : defaultCoordinates;

  return (
    <MapView
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={initialRegion}  //this was placed into an object above instead for organizabillity purposes
    >
      {origin && destination && (
        <MapViewDirections 
          origin={origin.description}
          destination={destination.description}  //describe the description of the destination we are going to (this is referring to the NavigateCard and RideOption sections)
          apikey={GOOGLE_MAPS_API_KEY}  //provide the API key that we are working with
          strokeWidth={3}  //this will display the path
          strokeColor='green'  //since we want to represent the eco route (although it isn't the eco route)
          mode='DRIVING'
        />
      )}
      {origin?.location && (
        <Marker 
          coordinate={{  //the purpose of this marker is to render the red icon display on the user's location specified
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
        />        
      )}
    </MapView>
  )
}

//const styles = StyleSheet.create({});
