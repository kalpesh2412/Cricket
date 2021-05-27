// components/dashboard.js

import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import firebase from "../../firebase";
import LinearGradient from "react-native-linear-gradient";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid,
    };
  }

  startAMatch = () => {
    const ref = firebase
      .firestore()
      .collection("users")
      .doc(this.state.uid)
      .collection("match")
      .doc();
    const matchId = ref.id;
    console.log("Match Id", matchId);
    this.props.navigation.navigate("Dashboard");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["transparent", "transparent"]}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.titleButton}
            onPress={() => this.startAMatch()}
          >
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Start A Match
            </Text>
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity style={styles.titleButton} onPress={() => {}}>
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Fantasy League
            </Text>
          </TouchableOpacity>
          <View style={styles.space} />
        </LinearGradient>
        {/* <LinearGradient
          colors={["white", "rgba(28,20,56,1)"]}
          style={styles.smallContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  smallContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 50,
    position: "absolute",
    elevation: 2,
    bottom: 110,
    width: "85%",
    height: "10%",
  },
  space: {
    width: 20, // or whatever size you need
    height: 30,
  },
  titleButton: {
    padding: 15,
    backgroundColor: "navy",
    borderRadius: 10,
    alignItems: "center",
  },
});
