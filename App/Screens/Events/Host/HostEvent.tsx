import React from "react";
import { SafeAreaView, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { MapFile } from "./MapFile";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../../components";

export function HostEvent() {
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
          Create Event
        </Text>
      </View>
      <MapFile />
      <View style={tw`flex w-full mt-12 justify-center items-center`}>
        <View style={{ width: "85%" }}>
          <Text style={{ marginBottom: 4, color: "gray" }}>Event Name</Text>
          <TextInput
            style={[tw` h-6 border-b-2 `, { width: "100%", color: "black" }]}
          ></TextInput>
        </View>
        <View style={{ width: "85%", marginTop: 40 }}>
          <Text style={{ marginBottom: 4, color: "gray" }}>Description:</Text>
          <TextInput
            style={[tw` h-6 border-b-2 `, { width: "100%", color: "black" }]}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={tw`p-4 mt-8 bg-black flex-row items-center justify-center rounded-lg`}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Create Event
          </Text>
          <Icon style={tw`ml-4`} name="check" color="white" type="antdesign" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
