import React from "react";
import { SafeAreaView, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
// import { MapFile } from "./MapFile";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../../components";

export function FindEvent() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={tw` items-center flex-row  p-6`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            style={tw`p-2  bg-black flex-row items-center justify-center rounded-lg w-10 h-10`}
            name="arrowleft"
            color="white"
            type="antdesign"
          />
        </TouchableOpacity>
        <Text
          style={tw`font-semibold flex w-full -ml-10  text-center justify-center text-xl`}
        >
          Join Event
        </Text>
      </View>
      {/* <MapFile /> */}
      <View style={tw`flex w-full mt-12 justify-center items-center`}>
        <TouchableOpacity>
          <Text>Hey</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
