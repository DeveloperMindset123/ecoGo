//Use this screen for the card view
import React from 'react';
import { //put the components vertically to improve understandabillity
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    FlatList, 
    TouchableOpacity,
    Dimensions
} from 'react-native';  //if we use basic view, it won't render as intended, use SafeAreaView instad (another side note: a "View" in react-native is similar to a div)
import tw from "tailwind-react-native-classnames";  //this will allow us to use tailwind like syntax for coding, also note that in react-native both tailwind and CSS can be used together if needed, implement them within an array
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';  //the icon sets in the react native elements are made possible through react-native-vector-icons
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransportionView } from '../../Screens/Eco';
import { Screens } from '../../Screens';  //we will need this for navigation purposes
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '@env';  //this will directly import the GOOGLE_MAPS_API_KEY value from @env
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../../../slices/navSlice';  //as of right now, this file doesn't exist


const data = [  //think of this as an array of objects, we will have to access their methods (each of which is 4 in this case)
    {
        id: "123",
        title: "Get an Eco-Friendly Route",
        image: "https://links.papareact.com/3pn",
        screen: "TransportationScreen",  //adjust as needed (defualt: MapScreen) --> redirect user to the MapScreen where the search functionalities for locations will be shown (note: the map screen needs to be implemented seperately, essentially, this will be pointing to the transportation.jsx )
    },
    {
        id: "456",
        title: "Find Eco-Friendly Restaurants",
        image: "https://links.papareact.com/28w",  //change this as needed
        screen: "EatsScreen",  //adjust as needed later
    },  //add a 3rd option to render on the screen, may require adjustments due to bugs 
    {
        id: "789",
        title: "Eco Friendly Shopping",  //this will give a list view of the list of the places that advocate for conservation efforts
        image: "https://iili.io/J0hZdIS.png", //this is the link where the png image is hosted
        screen: "ShoppingScreen",  
    }, //add the 4th option, will not be implemented within the time frame, the focus should only be on the implementation of the first two options
    {
        id: "5134",
        title: "Community Initiatives",
        image: "https://iili.io/J0hZGjI.png",  //this is the link where the image is hosted
        screen: "CommunityHelpers",
    }
]

//understanding the purpose of the <view> tag: The most fundamental component for building a UI, View is a container that supports layout with flexbox, style, some touch handling and accessibillity controls.
export const NavOptions = () => {  //use the useNavigation hook instead
    const navigation = useNavigation();
    return (
       <FlatList 
        data={data} 
        //style={}//pass in the data array defined above
       // --> we can comment this out later, 
       keyExtractor={(item) => item.id}  //the item.id will serve as the unique identifier in this case
        renderItem={({ item }) => (
                <TouchableOpacity  //this allows for the card view
                style={[tw`p-2 bg-gray-200 m-2`, { width: '75%', alignSelf: 'center', borderRadius: 30 }]} // Added alignSelf for horizontal centering
                onPress={() => navigation.navigate(item.screen)} //redirects user to the appropriate screen, make sure the screen names mathc the screen names in PooStack
                >
        <View style={{ alignItems: 'center' }}> 
            <Image 
                style={{ width: 120, height: 120, resizeMode: 'contain' }}
                source={{ uri: item.image }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon 
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                name="arrowright"
                color="white"
                type="antdesign"
            />
        </View>
    </TouchableOpacity>

        )}  //arrow function that will return a component, it will iterate through the objects defined iwthin the data array
       
       />
    )
}

export const OptionsScreen = () => {  //this is the function that is dealing with storing information
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                        alignSelf: 'center' // Align the header image to the center
                    }}
                    source={{
                        uri: 'https://links.papareact.com/gzs',
                    }}
                />
            </View>

            <GooglePlacesAutocomplete 
                placeholder='Where From?' //allow the user to type in 
                styles={{
                    container: {
                        flex: 0,
                        marginLeft: 45
                    },
                    textInput: {
                        fontSize: 18,
                    },
                }}
                minLength={2}  //you need to provide at least 2 inputs for the suggestions to popup
                query={{  //we will be passing in an abject here
                    key: GOOGLE_MAPS_API_KEY,  //call on the API key from the .env file
                    language: "en",
                }} 
                enablePoweredByContainer={false}  //we don't want to show the "PoweredByGoogle" icon
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400} 
                //define functionality for what will happen upon clicking
                onPress={(data, details=null) => {
                    dispatch(setOrigin({
                        location: details.geometry.location,  //this will provide an object with a latitude and longitude and that information will be stored inside of the redux store
                        description: data.description
                    }))

                    dispatch(setDestination(null))
                    //information for the console.log can be seen on the terminal
                    console.log(data);  //print out the user data upon clicking
                    console.log(details);  
                }}
                fetchDetails={true}
                //returnKeyType=('search')
                textInputProps={{
                    returnKeyType: "search"  //this is according to GPT
                }}
                    />

            <NavOptions /> 
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    //define the styling information here, allows us to write CSS directory into tsx file 
    text: {
        color: "blue",
    }

});  //A stylesheet is an abstraction similar to CSS stylesheets (add CSS within)

//a more effieicient way of styling is using tailwind-react native classnames instead

//understanding flat lists: is one component, it takes some data in this case it's an array and what we do is we tell it what to render out