
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Map } from '../../../components/Map/Map';  //to avoid running into errors, keep things in ts and tsx format
import MapView from 'react-native-maps';

const Transportation = () => {
  return (
    <View>
      <View   //recall that View is nothing more than a div (note that View should be imported from the react-native library rather than react-native-elements library)
      style={tw`h-1/2`}    //this mean this view will take up half the screen, also note that if MapView isn't placed within the view component, the map will not render and will result in an error message
      >
        <Map />
      </View>
    <View style={tw`h-1/2`}></View>
    </View>
  )
}

export default Transportation
