import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

export const RideOptions = () => {
  //for this section, adjust it to most efficient to least efficient fuel methods

  const data = [
    //think of this as an array of objects, we will have to access their methods (each of which is 4 in this case)
    {
      id: "123",
      title: "EV Vehicle",
      image: "https://links.papareact.com/3pn",
      screen: "TransportationScreen", //adjust as needed (defualt: MapScreen) --> redirect user to the MapScreen where the search functionalities for locations will be shown (note: the map screen needs to be implemented seperately, essentially, this will be pointing to the transportation.jsx )
    },
    {
      id: "456",
      title: "Combustion Engine",
      image: "https://links.papareact.com/3pn", //change this as needed
      screen: "EatsScreen", //adjust as needed later
    }, //add a 3rd option to render on the screen, may require adjustments due to bugs
  ];
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // horizontal
        style={tw`m-4`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("eco")}
            style={[
              tw`p-2 pl-6 flex flex-row items-center justify-between pr-20 pt-4 bg-gray-200 mb-6 rounded-xl  h-56 w-full `,
            ]}
          >
            <View style={[tw`flex-col items-center`]}>
              <Image
                style={{ width: 150, height: 150, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
              <Text style={tw`mt-2 text-xl font-semibold`}>{item.title}</Text>
            </View>
            <Icon
              style={[
                tw`p-2 flex-row items-center justify-center rounded-full w-24 h-16 mt-4`,
                { backgroundColor: "black" },
              ]}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
