import React from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";

const Splash_Screen = () => {
  const windowHeight = Dimensions.get('window').height; // Get the height of the window

  return (
    <View style={[styles.container, {height: windowHeight}]}>
      <Image
        source={require('../../assets/images/logo.png')} // Replace 'path_to_your_logo.png' with the actual path to your logo image
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#13171B",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300, // Adjust width as needed
    height: 300, // Adjust height as needed
    resizeMode: "contain", // Adjust resizeMode as needed
  },
});

export default Splash_Screen;
