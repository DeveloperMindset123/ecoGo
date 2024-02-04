import React, { useCallback, useMemo, useRef } from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import { Icon, Text } from "react-native-elements";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
// import { MapFile } from "./MapFile";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../../components";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GoBack } from "../GoBack";

const Event = ({ handlePresentModalPress }: any) => {
  return (
    <TouchableOpacity onPress={handlePresentModalPress}>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}>Curdside garbage</Text>
        <Text style={styles.eventDate}>Sat, Jan 10, 2020</Text>
        <Text style={styles.eventDescription}>
          Some stuff that probably fell out of a truck
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export function FindEvent() {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <GoBack col="black" text={"Join Event"} navigation={navigation} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
        <ScrollView>
          <Event handlePresentModalPress={handlePresentModalPress} />
          <Event handlePresentModalPress={handlePresentModalPress} />
          <Event handlePresentModalPress={handlePresentModalPress} />
          <Event handlePresentModalPress={handlePresentModalPress} />
          <Event handlePresentModalPress={handlePresentModalPress} />
          <Event handlePresentModalPress={handlePresentModalPress} />
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
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
