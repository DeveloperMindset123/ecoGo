import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { Screens } from "../../Screens";
import { useNavigation } from "@react-navigation/native";

export const GoBack = () => {
  //this function shouldn't accept any parameter values
  const navigation = useNavigation();
  return (
    <View style={tw`items-center flex-row p-6`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          style={tw`p-2 bg-white flex-row items-center justify-center rounded-lg w-10 h-10`}
          name="arrowleft"
          color="black"
          type="antdesign"
        />
      </TouchableOpacity>
      <Text
        style={[
          tw`font-semibold flex w-full -ml-10 text-center justify-center text-xl`,
          { pointerEvents: "none" },
        ]}
      ></Text>
    </View>
  );
};
