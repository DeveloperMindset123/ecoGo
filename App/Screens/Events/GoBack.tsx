import { View, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

export const GoBack = ({ navigation, col, text }: any) => {
  return (
    <View style={tw` items-center flex-row  p-6`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          style={[
            tw`p-2 flex-row  items-center justify-center rounded-lg w-10 h-10`,
            { backgroundColor: col === "white" ? "white" : "black" },
          ]}
          name="arrowleft"
          color={col === "white" ? "black" : "white"}
          type="antdesign"
        />
      </TouchableOpacity>
      <Text
        style={[
          tw`font-semibold flex w-full -ml-10 text-center justify-center text-xl`,
          { pointerEvents: "none" },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};
