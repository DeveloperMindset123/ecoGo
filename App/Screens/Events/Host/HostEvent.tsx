import React, { useContext, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { MapFile } from "./MapFile";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../../components";
import { GoBack } from "../GoBack";
import { AuthContext } from "../../../AuthProvider";

export function HostEvent() {
  const navigation = useNavigation();
  const { setEvents, setMarkers } = useContext(AuthContext);
  const [eventName, setEventname] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [marker, setMarker] = useState();
  return (
    <SafeAreaView>
      <GoBack col="black" text={"Create Event"} navigation={navigation} />
      <MapFile setMarker={setMarker} />
      <View style={tw`flex w-full mt-12 justify-center items-center`}>
        <View style={{ width: "85%" }}>
          <Text style={{ marginBottom: 4, color: "gray" }}>Event Name</Text>
          <TextInput
            onChangeText={(text) => setEventname(text)}
            style={[tw` h-6 border-b-2 `, { width: "100%", color: "black" }]}
          ></TextInput>
        </View>
        <View style={{ width: "85%", marginTop: 40 }}>
          <Text style={{ marginBottom: 4, color: "gray" }}>Description:</Text>
          <TextInput
            onChangeText={(text) => setEventDescription(text)}
            style={[tw` h-6 border-b-2 `, { width: "100%", color: "black" }]}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={tw`p-4 mt-8 bg-black flex-row items-center justify-center rounded-lg`}
          onPress={() => {
            console.log(marker);
            setEvents((prev: any) => {
              return [
                ...prev,
                {
                  id: prev.length + 1,
                  title: eventName,
                  description: eventDescription,
                  marker: marker,
                },
              ];
            });
            console.log(marker);
            setMarkers((prev: any) => {
              return [...prev, marker];
            });
            navigation.goBack();
          }}
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
