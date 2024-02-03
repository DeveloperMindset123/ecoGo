//Use this screen for the card view
import React from 'react';
import { //put the components vertically to improve understandabillity
    StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    Image, 
    FlatList, 
    TouchableOpacity 
} from 'react-native';  //if we use basic view, it won't render as intended, use SafeAreaView instad (another side note: a "View" in react-native is similar to a div)
import tw from "tailwind-react-native-classnames";  //this will allow us to use tailwind like syntax for coding, also note that in react-native both tailwind and CSS can be used together if needed, implement them within an array
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';  //the icon sets in the react native elements are made possible through react-native-vector-icons
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransportionView } from '../../Screens/Transportation';
import { Screens } from '../../Screens';  //we will need this for navigation purposes


const data = [  //think of this as an array of objects, we will have to access their methods (each of which is 4 in this case)
    {
        id: "123",
        title: "Get an Eco-Friendly Route",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",  //adjust as needed --> redirect user to the MapScreen where the search functionalities for locations will be shown (note: the map screen needs to be implemented seperately, essentially, this will be pointing to the transportation.jsx )
    },
    {
        id: "456",
        title: "Find Eco-Friendly Restaurants Nearby",
        image: "https://links.papareact.com/28w",  //change this as needed
        screen: "EatsScreen",  //adjust as needed later
    },  //add a 3rd option to render on the screen, may require adjustments due to bugs 
    {
        id: "789",
        title: "Eco Friendly Shopping",  //this will give a list view of the list of the places that advocate for conservation efforts
        image: "assets/Images/Eco-Friendly-Shopping.webp", //path to the image view for the eco friendly shopping
        screen: "ShoppingScreen",  
    }, //add the 4th option, will not be implemented within the time frame, the focus should only be on the implementation of the first two options
    {
        id: "5134",
        title: "Community Initiatives",
        image: "assets/Images/Recycling-Initiatives.webp",
        screen: "CommunityHelpers",
    }
]

const NavOptions = ( {navigation: any} ) => {
    return (
       <FlatList 
        data={data} //pass in the data array defined above
       //horizontal // --> we can comment this out later, 
       keyExtractor={(item) => item.id}  //the item.id will serve as the unique identifier in this case
        renderItem={({ item }) => (
            <TouchableOpacity
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            >
                <View>

                    <Image 
                        style={{width: 120, height: 120, resizeMode: 'contain'}}
                        source={{uri: item.image}}  //render the image that was specified in the data array
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>  {/**Renders the title and add styling using tailwind */}
                    <Icon 
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name="arrowright"
                        color="white"
                        type="antdesign"  //react-native-vector-icons doesn't have a type aspect
                        onPress={() => navigation.navigate({'eco'})}
                    />
                </View>
{/*<Text>{item.title}</Text>  {/*This will render the title stated within the object elements within the data array (uncomment this as needed)*/}
            </TouchableOpacity>
        )}  //arrow function that will return a component, it will iterate through the objects defined iwthin the data array
       
       />
    )
}

export const OptionsScreen = () => {
	return <SafeAreaView style={tw`bg-white h-full `}>
        <View style={tw`p-5`}>  {/*add padding so that the text isn't all the way to the left side*/}
            <Image 
                style={{
                    width: 100,  
                    height: 100, 
                    resizeMode: 'contain',
                }}
                source={{
                    uri: 'https://links.papareact.com/gzs',  //note: generate a logo later, this will serve as the skeleton component for now
                }}
            />
        </View>
        <NavOptions />  {/*place the navOptions component here*/}

        </SafeAreaView>;
    )
}

const styles = StyleSheet.create({
    //define the styling information here, allows us to write CSS directory into tsx file 
    text: {
        color: "blue",
    }

});  //A stylesheet is an abstraction similar to CSS stylesheets (add CSS within)

//a more effieicient way of styling is using tailwind-react native classnames instead

//understanding flat lists: is one component, it takes some data in this case it's an array and what we do is we tell it what to render out