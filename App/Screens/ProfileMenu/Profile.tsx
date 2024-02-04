import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MapFile } from "../Events/Host/MapFile";

const ProfileMenu = () => {
  const Event = ({ handlePresentModalPress, title, date, text }: any) => {
    return (
      <TouchableOpacity onPress={handlePresentModalPress}>
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{title}</Text>
          {/* <Text style={styles.eventDate}>Sat, Jan 10, 2020</Text> */}
          <Text style={styles.eventDescription}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <Image
          source={require("../Profile/Ecogo.png")}
          style={styles.profileImage}
        />

        <Text style={styles.nameText}>Garv S</Text>
        <Text style={styles.locationText}>New York</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>08</Text>
            <Text style={styles.statsLabel}>Events</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>10</Text>
            <Text style={styles.statsLabel}>Pollution</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>3</Text>
            <Text style={styles.statsLabel}>Points</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Event Photo</Text>
        </TouchableOpacity>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <MapFile />
          </View>
        </BottomSheetModal>
        <Event
          title={"Curdside garbage"}
          text={"Some stuff that probably fell out of a truck"}
          handlePresentModalPress={handlePresentModalPress}
        />

        {/* Add Activity section similar to the Event section */}
      </ScrollView>
    </BottomSheetModalProvider>
  );
};

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

export default ProfileMenu;
