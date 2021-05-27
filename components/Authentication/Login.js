// components/login.js

import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  LogBox,
} from "react-native";
import firebase from "../../firebase";
import { Icon } from "react-native-elements";

export default class Login extends Component {
  constructor() {
    super();
    LogBox.ignoreLogs(["Setting a timer"]);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  userLogin = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          console.log(res);
          console.log("User logged-in successfully!");
          this.setState({
            isLoading: false,
            email: "",
            password: "",
          });
          this.props.navigation.navigate("MyStack", { screen: "Home" });
        })
        .catch((error) => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={this.state.password}
            onChangeText={(val) => this.updateInputVal(val, "password")}
            maxLength={15}
            secureTextEntry={true}
          />
          <Icon name="eye-slash" type="font-awesome" color="#517fa4" />
        </View>
        <TouchableOpacity
          color="#3740FE"
          style={{
            padding: 15,
            backgroundColor: "#FFD600",
            borderRadius: 10,
            marginVertical: 20,
            alignItems: "center",
          }}
          onPress={() => this.userLogin()}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>LOGIN</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            marginTop: 25,
            justifyContent: "center",
          }}
        >
          <Text>Don't have account?</Text>
          <Text
            onPress={() => this.props.navigation.navigate("Signup")}
            style={{ color: "#FFD600" }}
          >
            {" "}
            Signup{" "}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "black",
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
