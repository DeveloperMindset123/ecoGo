import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ProfileMenu = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <Image
        source={require("../Profile/Ecogo.png")}
        style={styles.profileImage}
      />

      <Text style={styles.nameText}>Chris Jericho</Text>
      <Text style={styles.designationText}>UI/UX Designer</Text>
      <Text style={styles.locationText}>Stanislaus, California</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>08</Text>
          <Text style={styles.statsLabel}>Events</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>05</Text>
          <Text style={styles.statsLabel}>Pollution</Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>200</Text>
          <Text style={styles.statsLabel}>Points</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Event Photo</Text>
      </TouchableOpacity>

      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}>Birthday event</Text>
        <Text style={styles.eventDate}>Sat, Jan 10, 2020</Text>
        <Text style={styles.eventDescription}>
          Something that happens or is regarded as happening; an occurrence,
          especially one of some importance.
        </Text>
      </View>

      {/* Add Activity section similar to the Event section */}
    </ScrollView>
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
