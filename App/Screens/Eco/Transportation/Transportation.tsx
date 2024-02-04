import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Map, NavigateCard, RideOptions } from '../../../components/Map/index';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { GoBack } from '../../../components/GoBack/GoBack';
import { Screens } from '../../Screens';

const Transportation = (props:any) => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`h-1/2`}>
        <Map />
        <View {...props} style={styles.goBackContainer}>
          <GoBack  />
        </View>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptions}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  goBackContainer: {
    position: 'absolute',
    top: 10,  // Adjust these values as needed
    left: 10,
    zIndex: 10,  // Ensures the component is above the map
  },
});

export default Transportation;



