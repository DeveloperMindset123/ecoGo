import React from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Icon, Text } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
// import { MapFile } from "./MapFile";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../../components";
import { GoBack } from "../GoBack";

const Person = ({ name, eco, pol, pos }: any) => {
  return (
    <View
      style={[
        styles.eventContainer,
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        },
      ]}
    >
      <Text style={{ fontWeight: "bold", fontSize: 25 }}>{pos}.</Text>
      <View>
        <Text style={styles.eventTitle}>{name}</Text>
        <Text style={styles.eventDate}>{eco} Eco points</Text>
        <Text style={styles.eventDescription}>{pol} Pollution points</Text>
      </View>
    </View>
  );
};

export function Leaderboard() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <GoBack col="black" text={"Leaderboard"} navigation={navigation} />
      {/* <MapFile /> */}
      <ScrollView>
        <Person name="Kivanc P" eco={96} pol={13} pos={1} />
        <Person name="Ayan D" eco={11} pol={5} pos={2} />
        <Person name="Fahad F" eco={19} pol={43} pos={3} />
        <Person name="Garv S" eco={0} pol={999} pos={"??"} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: 50,
    marginLeft: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 20,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
  designationText: {
    fontSize: 16,
    color: "grey",
    alignSelf: "center",
  },
  locationText: {
    fontSize: 16,
    color: "grey",
    alignSelf: "center",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 20,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "tomato",
  },
  statsLabel: {
    fontSize: 12,
    color: "grey",
  },
  button: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  eventContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "grey",
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    color: "grey",
  },
  // Add styles for your Activity section here
});
