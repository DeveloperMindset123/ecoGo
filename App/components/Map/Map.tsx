import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectOrigin } from '../../../slices/navSlice';

export const Map = () => {
  const origin = useSelector(selectOrigin); // origin may be null or undefined

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
      initialRegion={initialRegion}
    >
      {origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
        />        
      )}
    </MapView>
  )
}

//const styles = StyleSheet.create({});
