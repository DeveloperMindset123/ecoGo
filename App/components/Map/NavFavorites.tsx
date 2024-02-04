import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

export const NavFavorites = () => {
  const data = [
    //two randomized frequently visited places, hardcoded due to lack of time
    {
      id: "123",
      icon: "home",
      location: "Home",
      destination: "Ozone Park, New York, USA",
    },
    {
      id: "456",
      icon: "briefcase",
      location: "Work",
      destination: "Harlem, New York, USA",
    },
  ];
  return (
    <FlatList
      data={data}
      style={tw`-mb-8`}
      keyExtractor={(item) => item.id} //iterate through the data array and obtain the id
      renderItem={(
        { item: { location, destination, icon } } //destructure to utilzie the info on location, destination and icons
      ) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({});
