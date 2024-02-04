import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setDestination } from '../../../slices';
import { useNavigation } from '@react-navigation/native';
export const NavigateCard = () => {  //this is the component that will be rendered at the bottom half of the page

    const dispatch = useDispatch();
    const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete 
                styles={toInputBoxStyles}
                fetchDetails={true}
                placeholder="Where to?"
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}  //you don't a new search suggestion to pop up every single time that you type, you only want it to pop up every 400 milliseconds, that's the reasoning behind dbounce
                enablePoweredByContainer={true}  //we want to show the Powered by Google icon
                query={{  //we will be passing in an abject here
                    key: GOOGLE_MAPS_API_KEY,  //call on the API key from the .env file
                    language: "en",
                }} //unless query i is provided, error will be thrown
                textInputProps={{  //use this instead of the direct use of returnKeyType
                    returnKeyType: "search"  //this is according to GPT
                }}
                minLength={2}  //specify the minimum number of characters that needs to be inserted into the search bar
                onPress={(data, details = null) => {
                    //initialize dispatcher above and use it within the body
                    dispatch(
                        setDestination({
                            location: details.geometry.location,  //retrieve the location information from the user input
                            description: data.description  //based on the location extracted, describe the description aspect of the specified location
                        }));

                    navigation.navigate('RideOptionsCard');  //naviagate the user to the screen defined in RideOptions.tsx (for react-native, think of screens as routes)
                }}
            />
        </View>
      </View>
    </SafeAreaView>
  )
}

const toInputBoxStyles = StyleSheet.create({  //define the styling for the input boxes
    container: {
        backgroundColor: "white",
        paddingTop: 10, //adjust this as needed
        flex: 0
    },
    TextInput: {
        backgroundColor: "bg-gray-200",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})

//const styles = StyleSheet.create({})