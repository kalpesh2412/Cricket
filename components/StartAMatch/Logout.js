import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import firebase from "../../firebase";

export default class Logout extends Component {
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <View>
        <Text>Hi Hello</Text>
        <Button title="Logout" onPress={() => this.signOut()} />
      </View>
    );
  }
}
