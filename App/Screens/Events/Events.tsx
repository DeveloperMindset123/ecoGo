import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "345",
    title: "Host an event",
    image: "https://links.papareact.com/28w",
    screen: "Find",
  },
  {
    id: "123",
    title: "Find an event",
    image: "https://links.papareact.com/3pn",
    screen: "Host",
  },

  {
    id: "456",
    title: "Leaderboard",
    image: "https://links.papareact.com/28w",
    screen: "Leaderboard",
  },
];

export function Events() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        width: "100%",
        padding: 20,
      }}
    >
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={[
              tw`p-2 pl-6 flex flex-row items-center justify-between pr-20 pt-4 bg-gray-200 mb-6 rounded-xl  h-56 w-full `,
            ]}
          >
            <View style={tw`flex-col items-center`}>
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
