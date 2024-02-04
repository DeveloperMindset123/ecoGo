import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

// Assuming you have an image called 'logo.png' in your assets folder
const logo = require("../Profile/Ecogo.png");

export function Profile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const navigator = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log("User created:", userCredential.user);
        setSignedUp(true);
        setErrorMessage("");
        navigator.navigate("ProfileMenu");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSignedUp(false);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("User signed in:", userCredential.user);
        setErrorMessage("");
        navigator.navigate("ProfileMenu");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.textInput}
      />
      <View style={{ height: 30 }} />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {signedUp && <Text style={styles.welcomeMessage}>Welcome to EcoGo!</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  textInput: {
    width: "85%",
    fontSize: 18,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "orange",
    padding: 12.5,
    width: "85%",
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: "green",
  },
});
